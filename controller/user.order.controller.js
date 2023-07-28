const mongoose = require("mongoose");
const Order = require("../model/Order");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const isToday = require("dayjs/plugin/isToday");
const isYesterday = require("dayjs/plugin/isYesterday");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");

// Apply necessary plugins to dayjs
dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// get all orders user
module.exports.getOrderByUser = async (req, res,next) => {
  // console.log(req.user)
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const totalDoc = await Order.countDocuments({ user: req.user._id });

    // total padding order count
    const totalPendingOrder = await Order.aggregate([
      {
        $match: {
          status: "pending",
          user: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // total padding order count
    const totalProcessingOrder = await Order.aggregate([
      {
        $match: {
          status: "processing",
          user: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const totalDeliveredOrder = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          user: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // today order amount

    // query for orders
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });

    res.send({
      orders,
      pending: totalPendingOrder.length === 0 ? 0 : totalPendingOrder[0].count,
      processing:
        totalProcessingOrder.length === 0 ? 0 : totalProcessingOrder[0].count,
      delivered:
        totalDeliveredOrder.length === 0 ? 0 : totalDeliveredOrder[0].count,

      totalDoc,
    });
  } catch (error) {
    next(error)
  }
};

// getOrderById
module.exports.getOrderById = async (req, res,next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error)
  }
};

// getDashboardAmount
exports.getDashboardAmount = async (req, res,next) => {
  try {
    const todayStart = dayjs().startOf("day");
    const todayEnd = dayjs().endOf("day");

    const yesterdayStart = dayjs().subtract(1, "day").startOf("day");
    const yesterdayEnd = dayjs().subtract(1, "day").endOf("day");

    const monthStart = dayjs().startOf("month");
    const monthEnd = dayjs().endOf("month");

    const todayOrders = await Order.find({
      createdAt: { $gte: todayStart.toDate(), $lte: todayEnd.toDate() },
    });

    let todayCashPaymentAmount = 0;
    let todayCardPaymentAmount = 0;

    todayOrders.forEach((order) => {
      if (order.paymentMethod === "COD") {
        todayCashPaymentAmount += order.totalAmount;
      } else if (order.paymentMethod === "Card") {
        todayCardPaymentAmount += order.totalAmount;
      }
    });

    const yesterdayOrders = await Order.find({
      createdAt: { $gte: yesterdayStart.toDate(), $lte: yesterdayEnd.toDate() },
    });

    let yesterDayCashPaymentAmount = 0;
    let yesterDayCardPaymentAmount = 0;

    yesterdayOrders.forEach((order) => {
      if (order.paymentMethod === "COD") {
        yesterDayCashPaymentAmount += order.totalAmount;
      } else if (order.paymentMethod === "Card") {
        yesterDayCardPaymentAmount += order.totalAmount;
      }
    });

    const monthlyOrders = await Order.find({
      createdAt: { $gte: monthStart.toDate(), $lte: monthEnd.toDate() },
    });

    const totalOrders = await Order.find();
    const todayOrderAmount = todayOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );
    const yesterdayOrderAmount = yesterdayOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );

    const monthlyOrderAmount = monthlyOrders.reduce((total, order) => {
      return total + order.totalAmount;
    }, 0);
    const totalOrderAmount = totalOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );

    res.status(200).send({
      todayOrderAmount,
      yesterdayOrderAmount,
      monthlyOrderAmount,
      totalOrderAmount,
      todayCardPaymentAmount,
      todayCashPaymentAmount,
      yesterDayCardPaymentAmount,
      yesterDayCashPaymentAmount,
    });
  } catch (error) {
    next(error)
  }
};
// get sales report
exports.getSalesReport = async (req, res,next) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const salesOrderChartData = await Order.find({
      updatedAt: {
        $gte: startOfWeek,
        $lte: new Date(),
      },
    });

    const salesReport = salesOrderChartData.reduce((res, value) => {
      const onlyDate = value.updatedAt.toISOString().split("T")[0];

      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
      }
      res[onlyDate].total += value.totalAmount;
      res[onlyDate].order += 1;
      return res;
    }, {});

    const salesReportData = Object.values(salesReport);

    // Send the response to the client site
    res.status(200).json({ salesReport: salesReportData });
  } catch (error) {
    // Handle error if any
    next(error)
  }
};

// Most Selling Category
exports.mostSellingCategory = async (req, res,next) => {
  try {
    const categoryData = await Order.aggregate([
      {
        $unwind: "$cart", // Deconstruct the cart array
      },
      {
        $group: {
          _id: "$cart.productType",
          count: { $sum: "$cart.orderQuantity" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({ categoryData });
  } catch (error) {
    next(error)
  }
};

// dashboard recent order
exports.getDashboardRecentOrder = async (req, res,next) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const queryObject = {
      status: { $in: ["pending", "processing", "delivered", "cancel"] },
    };

    const totalDoc = await Order.countDocuments(queryObject);

    const orders = await Order.aggregate([
      { $match: queryObject },
      { $sort: { updatedAt: -1 } },
      {
        $project: {
          invoice: 1,
          createdAt: 1,
          updatedAt: 1,
          paymentMethod: 1,
          name: 1,
          user: 1,
          totalAmount: 1,
          status:1,
        },
      },
    ]);

    res.status(200).send({
      orders: orders,
      page: page,
      limit: limit,
      totalOrder: totalDoc,
    });
  } catch (error) {
    next(error)
  }
};

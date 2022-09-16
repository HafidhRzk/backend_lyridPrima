const { transaction, user } = require('../../models');

exports.addTransaction = async (req, res) => {
  try {
    const idUser = req.user.id;
    const input = req.body.income
    const output = req.body.outcome
    const total = input - output
    const newTransaction = await transaction.create({
      tanggal: req.body.tanggal,
      bulan: req.body.bulan,
      tahun: req.body.tahun,
      keterangan: req.body.keterangan,
      income: input,
      outcome: output,
      balace: total,
      idUser: idUser,
    })
  
    res.send({
      status: "success",
      message: "Add Data Finished",
      data: {
        tanggal: newTransaction.tanggal,
        bulan: newTransaction.bulan,
        tahun: newTransaction.tahun,
        keterangan: newTransaction.keterangan,
        income: newTransaction.income,
        outcome: newTransaction.outcome,
        balace: total,
        idUser: idUser
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const idUser = req.user.id;

    let data = await transaction.findAll({
      where: {
        idUser,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getTransactionByDate = async (req, res) => {
  try {
    const idUser = req.user.id;
    let data = await transaction.findAll({
      where: {
        idUser,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    console.log(data.tanggal, "ini data");

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

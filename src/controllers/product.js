const { product } = require('../../models');

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return { ...item, image: process.env.PATH_FILE + item.image };
    });

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

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

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

exports.addProduct = async (req, res) => {
  try {

    const data = {
      kodeProduk: req.body.kodeProduk,
      namaProduk: req.body.namaProduk,
      qty: req.body.qty,
      image: req.file.filename,
    };

    let newProduct = await product.create(data);
    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt' ],
      },
    });
    productData = JSON.parse(JSON.stringify(productData));

    res.send({
      status: 'success...',
      data: {
        ...productData,
        image: process.env.PATH_FILE + productData.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      kodeProduk: req?.body?.kodeProduk,
      namaProduk: req?.body?.namaProduk,
      qty: req?.body?.qty,
      image: req?.file?.filename,
    };

    await product.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: 'success',
      data: {
        id,
        data,
        image: req?.file?.filename,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: 'success',
      message: `Delete product id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

const EmailTemplate = require("../models/EmailTemplate");

async function getById(id) {
  const template = await EmailTemplate.findOne({
    where: { id: id },
  });

  if (!template) {
    throw new Error("Invalid email template");
  }

  return template;
}

async function getAll() {
  return await EmailTemplate.findAll();
}

async function create(templateData) {
  return await EmailTemplate.create(templateData);
}

async function update(id, templateData) {
  const template = await EmailTemplate.findOne({
    where: { id: id },
  });

  if (!template) {
    throw new Error("Template not found");
  }

  return await template.update(templateData);
}

async function remove(id) {
  const template = await EmailTemplate.findOne({
    where: { id: id },
  });

  if (!template) {
    throw new Error("Template not found");
  }

  await template.destroy();
  return { message: "Template deleted successfully" };
}

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
};

const templateService = require("../services/templateService");

async function getAllTemplates(req, res) {
  try {
    const templates = await templateService.getAll();
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
}

async function getTemplateById(req, res) {
  try {
    const { id } = req.params;
    const data = req.query.data ? JSON.parse(req.query.data) : {};

    const template = await templateService.getById(id, data);
    res.status(200).json({ template });
  } catch (error) {
    console.error("Error fetching template:", error);

    if (error.message === "Invalid email template") {
      return res.status(404).json({ error: "Template not found" });
    }

    res.status(500).json({ error: "Failed to fetch template" });
  }
}

async function createTemplate(req, res) {
  try {
    const templateData = req.body;

    if (!templateData.name || !templateData.html) {
      return res
        .status(400)
        .json({ error: "Template name and HTML content are required" });
    }

    const newTemplate = await templateService.create(templateData);
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ error: "Failed to create template" });
  }
}

async function updateTemplate(req, res) {
  try {
    const { id } = req.params;
    const templateData = req.body;

    const updatedTemplate = await templateService.update(id, templateData);
    res.status(200).json(updatedTemplate);
  } catch (error) {
    console.error("Error updating template:", error);

    if (error.message === "Template not found") {
      return res.status(404).json({ error: "Template not found" });
    }

    res.status(500).json({ error: "Failed to update template" });
  }
}

async function deleteTemplate(req, res) {
  try {
    const { id } = req.params;

    const result = await templateService.remove(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting template:", error);

    if (error.message === "Template not found") {
      return res.status(404).json({ error: "Template not found" });
    }

    res.status(500).json({ error: "Failed to delete template" });
  }
}

module.exports = {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};

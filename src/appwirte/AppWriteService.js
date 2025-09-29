// src/appwirte/AppWriteService.js
import config_variable from "../config_variable/config_variable.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class AppWriteService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config_variable.appwriteUrl)
      .setProject(config_variable.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // ================= Documents =================
  async createDocument({ title, slug, content, featuredImage, status, userId }) {
    return this.databases.createDocument(
      config_variable.appwriteDatabaseId,
      config_variable.appwriteCollectionId,
      slug,
      { title, content, featuredImage, status, userId }
    );
  }

  async updateDocument({ slug, title, content, featuredImage, status, userId }) {
    return this.databases.updateDocument(
      config_variable.appwriteDatabaseId,
      config_variable.appwriteCollectionId,
      slug,
      { title, content, featuredImage, status, userId }
    );
  }

  async deleteDocument({ slug }) {
    await this.databases.deleteDocument(
      config_variable.appwriteDatabaseId,
      config_variable.appwriteCollectionId,
      slug
    );
    return true;
  }

  async getDocument({ slug }) {
    return this.databases.getDocument(
      config_variable.appwriteDatabaseId,
      config_variable.appwriteCollectionId,
      slug
    );
  }

  async getAllDocuments(queries = [Query.orderDesc("$createdAt")]) {
    return this.databases.listDocuments(
      config_variable.appwriteDatabaseId,
      config_variable.appwriteCollectionId,
      queries
    );
  }

  // ================= Files =================
  async uploadFile({ file }) {
    return this.storage.createFile(config_variable.appwriteBucketId, ID.unique(), file);
  }

  async deleteFile({ fileId }) {
    await this.storage.deleteFile(config_variable.appwriteBucketId, fileId);
    return true;
  }

  async getFilePreview({ fileId }) {
    return this.storage.getFilePreview(config_variable.appwriteBucketId, fileId);
  }

  // ================= Auth =================
  async getCurrentUser() {
    try {
      const account = new (await import("appwrite")).Account(this.client);
      return account.get();
    } catch (error) {
      return null;
    }
  }
}

// ✅ Named export
export const authService = new AppWriteService();
export default authService

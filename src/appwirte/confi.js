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

    // Create a new document
    async createDocument({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config_variable.appwriteDatabaseId,
                config_variable.appwriteCollectionId,
                slug, // document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.error("❌ Error creating document:", error);
            throw error;
        }
    }

    // Update existing document
    async updateDocument({ slug, title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                config_variable.appwriteDatabaseId,
                config_variable.appwriteCollectionId,
                slug, // document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.error("❌ Error updating document:", error);
            throw error;
        }
    }

    // Delete document
    async deleteDocument({ slug }) {
        try {
            await this.databases.deleteDocument(
                config_variable.appwriteDatabaseId,
                config_variable.appwriteCollectionId,
                slug // document ID
            );
            return true;
        } catch (error) {
            console.error("❌ Error deleting document:", error);
            throw error;
        }
    }

    // Get a single document
    async getDocument({ slug }) {
        try {
            return await this.databases.getDocument(
                config_variable.appwriteDatabaseId,
                config_variable.appwriteCollectionId,
                slug // document ID
            );
        } catch (error) {
            console.error("❌ Error fetching document:", error);
            throw error;
        }
    }

    // Get all documents
    async getAllDocuments(queries = [Query.orderDesc("$createdAt")]) {
        try {
            return await this.databases.listDocuments(
                config_variable.appwriteDatabaseId,
                config_variable.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("❌ Error fetching documents:", error);
            throw error;
        }
    }

    // Upload file
    async uploadFile({ file }) {
        try {
            const fileUploaded = await this.storage.createFile(
                config_variable.appwriteBucketId,
                ID.unique(),
                file
            );
            return fileUploaded;
        } catch (error) {
            console.error("❌ Error uploading file:", error);
            throw error;
        }
    }

    // Delete file
    async deleteFile({ fileId }) {
        try {
            await this.storage.deleteFile(
                config_variable.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("❌ Error deleting file:", error);
            throw error;
        }
    }

    // Get file preview
    async getFilePreview({ fileId }) {
        try {
            return this.storage.getFilePreview(
                config_variable.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("❌ Error getting file preview:", error);
            return null;
        }
    }
}

const appwriteService = new AppWriteService();
export default appwriteService;

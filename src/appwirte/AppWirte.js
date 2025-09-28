import config_variable from "../config_variable/config_variable";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config_variable.appwriteUrl)
      .setProject(config_variable.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // ✅ Create account
  async createAccount({ email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );
      console.log("✅ Account created successfully:", userAccount);
      return userAccount;
    } catch (error) {
      console.error("❌ Error creating account:", error);
      throw error;
    }
  }

  // ✅ Login
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("✅ Login successful:", session);
      return session;
    } catch (error) {
      console.error("❌ Error logging in:", error);
      throw error;
    }
  }

  // ✅ Get current user
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("👤 Current user:", user);
      return user;
    } catch (error) {
      console.error("❌ Error fetching current user:", error);
      throw error;
    }
  }

  // ✅ Logout
  async logout() {
    try {
      await this.account.deleteSession("current");
      console.log("👋 Logout successful");
    } catch (error) {
      console.error("❌ Error logging out:", error);
      throw error;
    }
  }
}

// ✅ Export instance so you don’t need to `new` it every time
const authService = new AuthService();
export default authService;

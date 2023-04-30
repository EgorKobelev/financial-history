import $api from "../http";

export class CategoryService {
    static async getAllCategories() {
        return await $api.get("/Categories/allCategories");
    }
    static async createCategory(name) {
        return await $api.post("/Categories/create", {
            name: name,
        });
    }
    static async deleteCategory(name) {
        return await $api.post("/Categories/delete", {
            name: name,
        });
    }
}

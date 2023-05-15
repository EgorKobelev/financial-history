import $api from "../http";

export class CategoryService {
    static async getAllCategories() {
        return await $api.get("/Categories/allCategories");
    }
    static async createCategory(form) {
        return await $api.post("/Categories/create", form);
    }
    static async deleteCategory(id) {
        return await $api.delete(`/Categories/delete${id}`);
    }
}

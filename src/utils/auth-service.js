import $api from "../http";


export class AuthService {
    static async login(email, password) {
        return await $api.post('signin', {
            email: email,
            password: password,
            rememberMe: false
        })
    }

    static async register(email, password, name) {
        return await $api.post("register", {
            email: email,
            password: password,
            name: name
        })
    }

    static async tokenLogin() {
        return await $api.post("signinWithAccess")
    }

    static async logout() {
        return await $api.post("signout"), {}, {withCredentials: true}}}
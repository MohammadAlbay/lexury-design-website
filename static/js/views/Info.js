import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.title = "info";
        this.name = "info";
        this.viewPath = `static/html/${this.name}.html`;
        this.postDependencies = [
            {
                path: "static/js/info.js",
                attributes : {}
            }
        ];
    }
    
    async onLoad() {
        await super.onLoad();
    }
    async getHtml() {
        return await super.getHtml();
    }
}
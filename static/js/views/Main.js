import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.title = "main";
        this.name = "main";

        this.viewPath = `static/html/${this.name}.html`;
        this.postDependencies = [
            {
                path: "static/js/info.js",
                attributes : {}
            }
        ];
    }

}
export default class AbstractView {
    static #host;
    static set fragmentContainer(h) {
        AbstractView.#host = h;
    }
    static get fragmentContainer() {
        return AbstractView.#host;
    }
    static get body() {return this.fragmentContainer;}


    static LOAD_PRE_DEPENDENCIES = 0;
    static LOAD_POST_DEPENDENCIES = 1;
    name;
    params;
    preDependencies;
    postDependencies;
    viewPath;
    htmlContent;

    #viewDidLoaded = false;
    constructor(params) {
        this.params = params;
        //this.loadDependencies();
    }

    set title(title) {
        document.title = title;
    }
    get title() {return document.title;}

    async getHtml() {
        
        return this.htmlContent;
    }

    async onLoad() {
        
        await this.loadDependencies(AbstractView.LOAD_PRE_DEPENDENCIES);
        
        //if(!this.#viewDidLoaded) {
            this.htmlContent = await fetch(this.viewPath).then(v => v.text());
            this.#viewDidLoaded = true;
        //}

        await this.loadDependencies(AbstractView.LOAD_POST_DEPENDENCIES);

        
    }
    async onUnload() {
        this.#viewDidLoaded = 
        await this.unloadDependencies();
    }
    async loadDependencies(state) {
        AbstractView.loadViewDependencies(this, state);
    }
    async unloadDependencies(state) {
        AbstractView.unloadViewDependencies(this);
    }

    static async loadViewDependencies(view, state) {
        let tempDependencies = 
            state == 0 ? view.preDependencies
            : view.postDependencies;

        if(tempDependencies === undefined || tempDependencies.length == 0)
            return;
        else {
            for(let i = tempDependencies.length-1; i > -1; i--) {
                let script = document.createElement('SCRIPT');
                script.setAttribute('for-view', view.name);
                script.src = tempDependencies[i].path;
                let attributes = tempDependencies[i].attributes;
                for(let attr in attributes) {
                    script.setAttribute(attr, attributes[attr]);
                }
                
                document.body.appendChild(script);
            }
        }
    }

    static async unloadViewDependencies(view) {
        let scripts = document.querySelectorAll(`script[for-view="${view.name}"]`);
        if(scripts == null && script.length == 0)
            return;

        scripts.forEach(script => {
            script.remove();
        });

    }
}
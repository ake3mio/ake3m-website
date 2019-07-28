import { TweenMax } from "gsap/umd/TweenMax";
import * as PIXI from "pixi.js";

export default function CanvasSlideshow(options) {

    const that = this;
    let rafID, mouseX = 0, mouseY = 0;

    //  OPTIONS
    /// ---------------------------
    options = options || {};
    options.stageWidth = options.hasOwnProperty('stageWidth') ? options.stageWidth : 258;
    options.stageHeight = options.hasOwnProperty('stageHeight') ? options.stageHeight : 544;
    options.pixiSprites = options.hasOwnProperty('sprites') ? options.sprites : [];
    options.eventSubscribers = options.hasOwnProperty('eventSubscribers') ? options.eventSubscribers : [];
    options.autoPlay = options.hasOwnProperty('autoPlay') ? options.autoPlay : true;
    options.autoPlaySpeed = options.hasOwnProperty('autoPlaySpeed') ? options.autoPlaySpeed : [10, 3];
    options.fullScreen = options.hasOwnProperty('fullScreen') ? options.fullScreen : false;
    options.displaceScale = options.hasOwnProperty('displaceScale') ? options.displaceScale : [200, 70];
    options.displacementImage = options.hasOwnProperty('displacementImage') ? options.displacementImage : '';
    options.displaceAutoFit = options.hasOwnProperty('displaceAutoFit') ? options.displaceAutoFit : false;
    options.displaceScaleTo = (options.autoPlay === false) ? [0, 0] : [20, 20];
    options.dispatchPointerOver = options.hasOwnProperty('dispatchPointerOver') ? options.dispatchPointerOver : false;

    const renderer = new PIXI.autoDetectRenderer({
        width: options.stageWidth,
        height: options.stageHeight,
        transparent: true
    });

    const stage = new PIXI.Container();
    const displacementSprite = new PIXI.Sprite.from(options.displacementImage);
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);


    this.initPixi = function () {

        // Add canvas to the HTML
        renderer.view.width = options.stageWidth;
        renderer.view.height = options.stageHeight;
        options.parent.appendChild(renderer.view);

        // Enable Interactions
        stage.interactive = true;

        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        // Set the filter to stage and set some default values for the animation
        stage.filters = [displacementFilter];

        displacementSprite.scale.x = 2;
        displacementSprite.scale.y = 2;

        // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
        displacementFilter.autoFit = options.displaceAutoFit;

        stage.addChild(displacementSprite);

    };

    this.loadPixiSprites = function (sprites) {

        var rSprites = options.sprites;

        for (var i = 0; i < rSprites.length; i++) {

            var texture = new PIXI.Texture.from(sprites[i]);
            var image = new PIXI.Sprite(texture);
            image.width = options.stageWidth;
            image.height = options.stageHeight;

            if (i !== 0) {
                TweenMax.set(image, { alpha: 0 });
            }

            stage.addChild(image);

        }
    };

    const ticker = new PIXI.Ticker();

    ticker.autoStart = true;

    ticker.add(function (delta) {

        displacementSprite.x += options.autoPlaySpeed[0] * delta;
        displacementSprite.y += options.autoPlaySpeed[1] * delta;

        renderer.render(stage);

    });

    this.init = function () {
        that.loadPixiSprites(options.pixiSprites);
        that.initPixi();
    };

    function rotateSpite() {
        displacementSprite.rotation += 0.001;
        rafID = requestAnimationFrame(rotateSpite);
    }

    // Enable interactions on our slider
    stage.interactive = true;
    stage.buttonMode = true;

    const pointerover = function (mouseData) {
        mouseX = mouseData.data ? mouseData.data.global.x : mouseData.clientX;
        mouseY = mouseData.data ? mouseData.data.global.y : mouseData.clientY;
        TweenMax.to(displacementFilter.scale, 1, {
            x: "+=" + Math.sin(mouseX) * 100 + "",
            y: "+=" + Math.cos(mouseY) * 100 + ""
        });
        rotateSpite();
    };

    const pointerout = function () {
        TweenMax.to(displacementFilter.scale, 1, { x: 20, y: 20 });
        displacementSprite.scale.x = 2;
        displacementSprite.scale.y = 2;
        mouseY = mouseX = 0;
        cancelAnimationFrame(rafID);
    };

    stage.mouseover = pointerover;
    stage.touchmove = pointerover;

    stage.mouseout = pointerout;
    stage.touchendoutside = pointerout;

    options.eventSubscribers.forEach(el => {
        el.onmouseenter = pointerover;
        el.ontouchmove = pointerout;
        el.onmouseenter = pointerover;
        el.touchend = pointerout;
    });

    this.init();

    this.dispose = () => {
        ticker.destroy();
        stage.destroy();
    }
};

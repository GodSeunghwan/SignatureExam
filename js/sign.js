window.onload = function () {
    var canvas = document.getElementById("sign");
    var sign = new Sign("sign");

    canvas.addEventListener("mousedown", function (e) { sign.mousedown(e); });
    canvas.addEventListener("mouseup", function (e) { sign.mouseup(e); });
    canvas.addEventListener("mouseover", function (e) { sign.mouseover(e); });
    canvas.addEventListener("mouseout", function (e) { sign.mouseout(e); });
    canvas.addEventListener("mousemove", function (e) { sign.mousemove(e); });
    canvas.addEventListener("mousewheel", function (e) { sign.mousewheel(e); });
    $(document).on("click", "#reset", function () { sign.reset(); });
    $(document).on("click", "#save", function () { sign.save(); });
}

function Sign(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "#333333";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.mouseDownCheck = false;
    this.beforeX = null;
    this.beforeY = null;
    this.nowX = null;
    this.nowY = null;
    this.scale = 1.0;

    this.draw = function () {
        this.context.save();
        this.context.beginPath();
        this.context.moveTo(this.beforeX, this.beforeY);
        this.context.lineTo(this.nowX, this.nowY);
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#ffffff";
        this.context.stroke();
        this.beforeX = this.nowX;
        this.beforeY = this.nowY;
    }
    this.resetXY = function(){
        this.beforeX = null;
        this.beforeY = null;
        this.nowX = null;
        this.nowY = null;
    }
    this.reset = function () {
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#333333";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.resetXY();
    }
    this.save = function () {
        data = this.canvas.toDataURL("image/png").replace("data:image/png;base64,", "data:application/octet-streamng; base64,");
        link = document.createElement("a");
        link.href = data;
        link.download = "sign.png";
        link.click();
        this.reset();
    }
    this.mousedown = function () {
        this.mouseDownCheck = true;
    }
    this.mouseup = function () {
        this.mouseDownCheck = false;
        this.resetXY();
    }
    this.mouseover = function () {
        this.mouseDownCheck = false;
    }
    this.mouseout = function () {
        this.mouseDownCheck = false;
    }
    this.mousemove = function (e) {
        if (this.mouseDownCheck) {
            if (this.beforeX == null || this.beforeY == null) {
                this.beforeX = e.layerX;
                this.beforeY = e.layerY;
            } else {
                this.nowX = e.layerX;
                this.nowY = e.layerY;
                this.draw();
            }
        }
    }
    this.mousewheel = function (e) {
        if (e.deltaY < 0) {
            // up
            this.scale /= 0.8;
        } else if (e.deltaY > 0) {
            // down
            this.scale *= 0.8;
        }
    }
}

    // Get a file as a string using  AJAX
    function loadFileAJAX(name) {
        var xhr = new XMLHttpRequest(),
            okStatus = document.location.protocol === "file:" ? 0 : 200;
        xhr.open('GET', name, false);
        xhr.send(null);
        return xhr.status == okStatus ? xhr.responseText : null;
    };

    
    function initShaders(gl, vShaderName, fShaderName) {
        function getShader(gl, shaderName, type) {
            var shader = gl.createShader(type),
                shaderScript = loadFileAJAX(shaderName);

            
            if (!shaderScript) {
                alert("Could not find shader source: "+shaderName);
            }
            gl.shaderSource(shader, shaderScript);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }
        var vertexShader = getShader(gl, vShaderName, gl.VERTEX_SHADER),
            fragmentShader = getShader(gl, fShaderName, gl.FRAGMENT_SHADER),
            program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
            return null;
        }



        // a = async () => {
        //     const response = await fetch( vShaderName );
        //     const v = await response.text();
        //     const res = await fetch( fShaderName )
        //     const f = await res.text()
        //     return [v, f];
        // }
        // a().then( ([v, f]) => {
        //     console.log(v, f);
        //     let vertexShader = gl.createShader(gl.VERTEX_SHADER)
        //     let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        //     gl.shaderSource(vertexShader, v);
        //     gl.shaderSource(fragmentShader, f)
        //     gl.compileShader(vertexShader);x
        //     gl.compileShader(fragmentShader);
        //     let program = gl.createProgram()
        //     gl.attachShader(program, vertexShader)
        //     gl.attachShader(program, fragmentShader)
        //     gl.linkProgram(program)
        //     gl.useProgram(program)

        //     let loc = gl.getUniformLocation(program, "translation")
        //     console.log(loc);
        //     loc = gl.getUniformLocation(program, "cameraTranslation")
        //     console.log(loc);

        //     loc = gl.getAttribLocation(program, "texture");
        //     console.log("log", loc);
        // })
        
        return program;
    };


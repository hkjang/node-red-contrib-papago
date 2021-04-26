const axios = require("axios")
module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.clientId = RED.nodes.getNode(n.creds).credentials.clientId;
            this.clientSecret = RED.nodes.getNode(n.creds).credentials.clientSecret;
        } else {
            this.clientId = "";
            this.clientSecret = "";
        }
        var node = this;
        this.name = n.name;

        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = msg[i] || node[i] ;
                }
            }
            if(!node.url){
                node.url = 'https://openapi.naver.com/v1/papago/n2mt';
            }

            node.options = {};
            node.options.headers = {};

            node.params = {};
            node.params.text = node.text;
            node.params.source = node.source;
            node.params.target = node.target;

            node.options.headers['X-Naver-Client-Id'] = node.clientId;
            node.options.headers['X-Naver-Client-Secret'] = node.clientSecret;

            axios.post(node.url, node.params, node.options)
                .then(function (response){
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function (err){
                    msg.payload = err;
                    node.send(msg);
                });
        });
    }

    RED.nodes.registerType("papago", FunctionNode, {
        credentials: {
            clientId: {type:"text"},
            clientSecret: {type:"text"}
        }
    });

    function naverPapagoApiKey(n){
        RED.nodes.createNode(this, n);
        this.clientId = n.clientId;
        this.clientSecret = n.clientSecret;
    }

    RED.nodes.registerType("naverPapagoApiKey", naverPapagoApiKey,{
        credentials: {
            clientId: {type:"text"},
            clientSecret: {type:"text"}
        }
    });
};

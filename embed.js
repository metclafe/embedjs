(function() {
    var domainsUrl = "https://cdn.jsdelivr.net/gh/metclafe/embedjs@main/list.json";

    fetch(domainsUrl)
        .then(res => res.json())
        .then(data => {
            var domains = data.domains;
            var embeds = document.querySelectorAll("div[playerembed]");

            embeds.forEach(function(container) {
                var channel = container.getAttribute("playerembed");
                var currentDomainIndex = 0;

                var loadingElement = document.createElement("div");
                loadingElement.innerHTML = "<div style='text-align:center;padding:20px;'>Checking available servers...</div>";
                container.appendChild(loadingElement);

                function checkDomain(domain) {
                    return new Promise((resolve, reject) => {
                        var testIframe = document.createElement("iframe");
                        testIframe.style.display = "none";
                        testIframe.src = domain + channel;

                        var timeoutId = setTimeout(() => {
                            reject(new Error("Timeout"));
                            testIframe.remove();
                        }, 5000);

                        testIframe.onload = function() {
                            clearTimeout(timeoutId);
                            try {
                                if (testIframe.contentWindow) {
                                    resolve(domain);
                                } else {
                                    reject(new Error("Blocked"));
                                }
                            } catch (e) {
                                reject(new Error("Access denied"));
                            } finally {
                                testIframe.remove();
                            }
                        };

                        testIframe.onerror = function() {
                            clearTimeout(timeoutId);
                            reject(new Error("Failed to load"));
                            testIframe.remove();
                        };

                        document.body.appendChild(testIframe);
                    });
                }

                async function findWorkingDomain() {
                    for (let domain of domains) {
                        try {
                            await checkDomain(domain);
                            return domain;
                        } catch (error) {
                            console.log(`Domain ${domain} failed:`, error.message);
                            continue;
                        }
                    }
                    return null;
                }

                findWorkingDomain().then(workingDomain => {
                    container.innerHTML = '';

                    if (workingDomain) {
                        var iframe = document.createElement("iframe");
                        iframe.width = "100%";
                        iframe.height = "600";
                        iframe.style.border = "0";
                        iframe.src = workingDomain + channel;
                        iframe.allowFullscreen = true;
                        container.appendChild(iframe);
                    } else {
                        container.innerHTML = "<div style='color:red;text-align:center;padding:20px;'>No servers available at the moment. Please try again later.</div>";
                    }
                });
            });
        })
        .catch(err => {
            console.error("Error loading domain list", err);
            document.querySelectorAll("div[playerembed]").forEach(container => {
                container.innerHTML = "<div style='color:red;text-align:center;padding:20px;'>Error loading server list. Please try again later.</div>";
            });
        });
})();

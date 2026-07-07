/*
  Interactions globales du site officiel uprcongo.cd.
  JavaScript volontairement léger : menu mobile, thème sombre, formulaires
  statiques, copie de lien et rendu des actualités publiées via Decap CMS.
*/
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var themeKey = "upr-theme";

  function qs(selector, parent) {
    return (parent || doc).querySelector(selector);
  }

  function qsa(selector, parent) {
    return Array.prototype.slice.call((parent || doc).querySelectorAll(selector));
  }

  function text(value, fallback) {
    if (value === undefined || value === null || String(value).trim() === "") {
      return fallback || "";
    }
    return String(value).trim();
  }

  function formatDate(value) {
    if (!value) return "";
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return text(value);
    return new Intl.DateTimeFormat("fr-CD", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function create(tagName, className, value) {
    var element = doc.createElement(tagName);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    qsa("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-label", isDark ? "Activer le mode clair" : "Activer le mode sombre");
    });
    qsa("[data-theme-icon]").forEach(function (icon) {
      icon.textContent = isDark ? "☀" : "☾";
    });
  }

  function initTheme() {
    var savedTheme = localStorage.getItem(themeKey);
    var preferredTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(savedTheme || preferredTheme);

    qsa("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var nextTheme = root.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem(themeKey, nextTheme);
        applyTheme(nextTheme);
      });
    });
  }

  function initMobileMenu() {
    var toggle = qs("[data-menu-toggle]");
    var menu = qs("[data-mobile-menu]");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    qsa("a", menu).forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeMenu();
    });
  }

  function initForms() {
    qsa("[data-contact-form], [data-adhesion-form]").forEach(function (form) {
      var feedback = qs("[data-form-feedback]", form);
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var fields = qsa("input, textarea, select", form);
        var invalid = fields.some(function (field) {
          return field.hasAttribute("required") && text(field.value) === "";
        });

        if (invalid) {
          if (feedback) {
            feedback.textContent = "Veuillez remplir tous les champs obligatoires.";
            feedback.classList.add("error");
          }
          return;
        }

        if (feedback) {
          feedback.textContent = "Merci. Votre message a été préparé avec succès sur cette version statique.";
          feedback.classList.remove("error");
        }
        form.reset();
      });
    });
  }

  function initCopyLink() {
    qsa("[data-copy-link]").forEach(function (button) {
      var feedbackId = button.getAttribute("aria-describedby");
      var feedback = feedbackId ? doc.getElementById(feedbackId) : qs("[data-copy-feedback]");

      button.addEventListener("click", function () {
        var url = window.location.href;
        var onSuccess = function () {
          if (feedback) {
            feedback.textContent = "Lien copié";
            window.setTimeout(function () {
              feedback.textContent = "";
            }, 2200);
          }
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(onSuccess).catch(onSuccess);
          return;
        }

        var area = create("textarea");
        area.value = url;
        area.setAttribute("readonly", "readonly");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        doc.body.appendChild(area);
        area.select();
        try {
          doc.execCommand("copy");
        } catch (error) {
          /* L’ancien API peut échouer dans certains navigateurs. */
        }
        area.remove();
        onSuccess();
      });
    });
  }

  function cardUrl(item) {
    return text(item.url, "actualites.html");
  }

  function imagePath(item) {
    return text(item.image, "assets/uploads/actualite-mobilisation.svg");
  }

  function renderNewsCard(item) {
    var article = create("article", "news-card");
    article.setAttribute("data-category", text(item.categorie, "Vie du parti"));

    var image = create("img");
    image.src = imagePath(item);
    image.alt = text(item.image_alt, "Publication officielle de l’UPR");
    image.width = 760;
    image.height = 500;
    image.loading = "lazy";
    image.decoding = "async";
    article.appendChild(image);

    var body = create("div");
    var tag = create("span", "tag", text(item.categorie, "Vie du parti"));
    var title = create("h3", "", text(item.titre, "Publication officielle de l’UPR"));
    var summary = create("p", "", text(item.description_courte, "Information officielle de l’Union des Patriotes pour la République."));
    var date = create("p", "news-date", formatDate(item.date));
    var link = create("a", "", "Lire plus");
    link.href = cardUrl(item);

    body.appendChild(tag);
    body.appendChild(title);
    body.appendChild(summary);
    if (date.textContent) body.appendChild(date);
    body.appendChild(link);
    article.appendChild(body);

    return article;
  }

  function renderFeatured(item, target) {
    if (!target || !item) return;
    target.textContent = "";

    var wrap = create("div", "featured-inner");
    var image = create("img");
    image.src = imagePath(item);
    image.alt = text(item.image_alt, "Actualité officielle de l’UPR");
    image.width = 900;
    image.height = 560;
    image.loading = "lazy";
    image.decoding = "async";

    var body = create("div");
    body.appendChild(create("span", "tag", text(item.categorie, "Vie du parti")));
    body.appendChild(create("h3", "", text(item.titre, "Actualité officielle de l’UPR")));
    body.appendChild(create("p", "", text(item.description_courte, "Information officielle de l’Union des Patriotes pour la République.")));
    var date = create("p", "news-date", formatDate(item.date));
    if (date.textContent) body.appendChild(date);
    var link = create("a", "btn-primary", "Lire la publication");
    link.href = cardUrl(item);
    body.appendChild(link);

    wrap.appendChild(image);
    wrap.appendChild(body);
    target.appendChild(wrap);
  }

  function sortByDate(items) {
    return items.slice().sort(function (a, b) {
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
    });
  }

  function renderHomeNews(items) {
    var featuredTarget = qs("#featured-actualite");
    var latestTarget = qs("#latest-actualites");
    if (!featuredTarget && !latestTarget) return;
    if (!Array.isArray(items) || items.length === 0) return;

    var sorted = sortByDate(items);
    var featured = sorted.find(function (item) {
      return item.featured === true || item.featured === "true";
    }) || sorted[0];

    renderFeatured(featured, featuredTarget);

    if (latestTarget) {
      latestTarget.textContent = "";
      sorted
        .filter(function (item) {
          return item.slug !== featured.slug;
        })
        .slice(0, 3)
        .forEach(function (item) {
          latestTarget.appendChild(renderNewsCard(item));
        });
    }
  }

  function renderActualitesPage(items) {
    var grid = qs("#all-actualites");
    var empty = qs("#actualites-empty");
    var buttons = qsa("[data-category-filter]");
    if (!grid || !Array.isArray(items) || items.length === 0) return;

    var sorted = sortByDate(items);

    function render(category) {
      var filtered = category === "Toutes" ? sorted : sorted.filter(function (item) {
        return text(item.categorie) === category;
      });

      grid.textContent = "";
      filtered.forEach(function (item) {
        grid.appendChild(renderNewsCard(item));
      });

      if (empty) empty.classList.toggle("hidden", filtered.length > 0);
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        buttons.forEach(function (other) {
          other.classList.remove("active");
        });
        button.classList.add("active");
        render(button.getAttribute("data-category-filter") || "Toutes");
      });
    });

    render("Toutes");
  }

  function initNews() {
    var needsHome = Boolean(qs("#featured-actualite"));
    var needsList = Boolean(qs("#all-actualites"));
    if (!needsHome && !needsList) return;

    function fetchJson(url) {
      return fetch(url, { cache: "no-cache" })
        .then(function (response) {
          if (!response.ok) throw new Error("Contenu indisponible");
          return response.json();
        })
        .catch(function () {
          return [];
        });
    }

    var actualites = fetchJson("data/actualites.json");

    if (needsHome) {
      actualites.then(function (items) {
        renderHomeNews(items);
      });
    }

    if (needsList) {
      Promise.all([
        actualites,
        fetchJson("data/communiques.json"),
        fetchJson("data/evenements.json")
      ])
      .then(function (response) {
        return response.flat();
      })
      .then(function (items) {
        renderActualitesPage(items);
      });
    }
  }

  function init() {
    initTheme();
    initMobileMenu();
    initForms();
    initCopyLink();
    initNews();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

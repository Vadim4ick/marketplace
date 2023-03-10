(() => {
  "use strict";
  const e = {};
  let t = !0,
    o = (e = 500) => {
      let o = document.querySelector("body");
      if (t) {
        let r = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < r.length; e++) {
            r[e].style.paddingRight = "0px";
          }
          (o.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    r = (e = 500) => {
      let o = document.querySelector("body");
      if (t) {
        let r = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < r.length; e++) {
          r[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (o.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  function s(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function a(e) {
    return e.filter(function (e, t, o) {
      return o.indexOf(e) === t;
    });
  }
  let n = (e, t = !1, r = 500, a = 0) => {
    const n = "string" == typeof e ? document.querySelector(e) : e;
    if (n) {
      let l = "",
        c = 0;
      t &&
        ((l = "header.header"), (c = document.querySelector(l).offsetHeight));
      let i = {
        speedAsDuration: !0,
        speed: r,
        header: l,
        offset: a,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", i);
      else {
        let e = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: c ? e - c : e, behavior: "smooth" });
      }
      s(`[gotoBlock]: ????????...???????? ?? ${e}`);
    } else s(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${e}`);
  };
  let l = {
    getErrors(e) {
      let t = 0,
        o = e.querySelectorAll("*[data-required]");
      return (
        o.length &&
          o.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : "checkbox" !== e.type || e.checked
          ? "tel" === e.type && e.value.length < 10
            ? (this.addError(e), t++)
            : e.value
            ? this.removeError(e)
            : (this.addError(e), t++)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let o = t.querySelectorAll("input,textarea");
          for (let e = 0; e < o.length; e++) {
            const t = o[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              l.removeError(t);
          }
          let r = t.querySelectorAll(".checkbox__input");
          if (r.length > 0)
            for (let e = 0; e < r.length; e++) {
              r[e].checked = !1;
            }
          if (e.select) {
            let o = t.querySelectorAll(".select");
            if (o.length)
              for (let t = 0; t < o.length; t++) {
                const r = o[t].querySelector("select");
                e.select.selectBuild(r);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `??????????????????, ?????????? ???? ?????????????????? (${e.length})...`
        ),
          a(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let o = t.split("|"),
              r = { root: o[0], margin: o[1], threshold: o[2] },
              s = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  o = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  s = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === r.root &&
                  String(o) === r.margin &&
                  String(s) === r.threshold
                )
                  return e;
              }),
              a = this.getScrollWatcherConfig(r);
            this.scrollWatcherInit(s, a);
          });
      } else
        this.scrollWatcherLogging("????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `??????... ?????????????????????????? ?????????????? ${e.root} ?????? ???? ????????????????`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???????? ${t.classList}, ?????????????? ?????????? _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???? ???????? ${t.classList}, ?????????? ?????????? _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && s(`[??????????????????????]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const o = e.target;
      this.scrollWatcherIntersecting(e, o),
        o.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(o, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let c = !1;
  function i(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (c) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (i.prototype.init = function () {
      const e = this;
      (this.??bjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          o = t.dataset.da.trim().split(","),
          r = {};
        (r.element = t),
          (r.parent = t.parentNode),
          (r.destination = document.querySelector(o[0].trim())),
          (r.breakpoint = o[1] ? o[1].trim() : "767"),
          (r.place = o[2] ? o[2].trim() : "last"),
          (r.index = this.indexInParent(r.parent, r.element)),
          this.??bjects.push(r);
      }
      this.arraySort(this.??bjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.??bjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, o) {
            return Array.prototype.indexOf.call(o, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const o = this.mediaQueries[t],
          r = String.prototype.split.call(o, ","),
          s = window.matchMedia(r[0]),
          a = r[1],
          n = Array.prototype.filter.call(this.??bjects, function (e) {
            return e.breakpoint === a;
          });
        s.addListener(function () {
          e.mediaHandler(s, n);
        }),
          this.mediaHandler(s, n);
      }
    }),
    (i.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const o = t[e];
          (o.index = this.indexInParent(o.parent, o.element)),
            this.moveTo(o.place, o.element, o.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const o = t[e];
          o.element.classList.contains(this.daClassname) &&
            this.moveBack(o.parent, o.element, o.index);
        }
    }),
    (i.prototype.moveTo = function (e, t, o) {
      t.classList.add(this.daClassname),
        "last" === e || e >= o.children.length
          ? o.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? o.children[e].insertAdjacentElement("beforebegin", t)
          : o.insertAdjacentElement("afterbegin", t);
    }),
    (i.prototype.moveBack = function (e, t, o) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[o]
          ? e.children[o].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (i.prototype.indexInParent = function (e, t) {
      const o = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(o, t);
    }),
    (i.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new i("max").init();
  let d = [55.677128, 37.781964];
  ymaps.ready(function () {
    let e = new ymaps.Map("map", { center: d, zoom: 17 }),
      t = new ymaps.Placemark(
        d,
        {},
        {
          iconLayout: "default#image",
          iconImageHref: "../img/icon.svg",
          iconImageSize: [40, 40],
          iconImageOffset: [-19, -44],
        }
      );
    e.controls.remove("geolocationControl"),
      e.controls.remove("searchControl"),
      e.controls.remove("trafficControl"),
      e.controls.remove("typeSelector"),
      e.controls.remove("fullscreenControl"),
      e.controls.remove("zoomControl"),
      e.controls.remove("rulerControl"),
      e.behaviors.disable(["scrollZoom"]),
      e.geoObjects.add(t);
  });
  const h = document.querySelectorAll('a[href*="#"]');
  for (let e of h)
    e.addEventListener("click", function (t) {
      t.preventDefault();
      const o = e.getAttribute("href").substr(1);
      document
        .getElementById(o)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });
  document.querySelectorAll(".header__menu a").forEach((e) => {
    e.addEventListener("click", () => {
      document.documentElement.classList.remove("menu-open"),
        document.documentElement.classList.remove("lock");
    });
  }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          t &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? o(e) : r(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const o = document.forms;
      if (o.length)
        for (const e of o)
          e.addEventListener("submit", function (e) {
            r(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              l.formClean(t);
            });
      async function r(e, o) {
        if (0 === (t ? l.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            o.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              r = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              s = new FormData(e);
            e.classList.add("_sending");
            const n = await fetch(t, { method: r, body: s });
            if (n.ok) {
              await n.text();
              e.classList.remove("_sending"), a(e);
            } else alert("????????????"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (o.preventDefault(), a(e));
        } else {
          o.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && n(t, !0, 1e3);
        }
      }
      function a(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          (window.location.pathname = "/success.html"),
          l.formClean(e),
          s(`[??????????]: ${"?????????? ????????????????????!"}`);
      }
    })(!0),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const o = t.closest("[data-goto]"),
              r = o.dataset.goto ? o.dataset.goto : "",
              s = !!o.hasAttribute("data-goto-header"),
              a = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            n(r, s, a), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            o = t.target;
          if ("navigator" === o.dataset.watch) {
            const e = o.id,
              r =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? r && r.classList.add("_navigator-active")
              : r && r.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })(),
    (function () {
      c = !0;
      const e = document.querySelector("header.header"),
        t = document.querySelector(".wrapper"),
        o = e.hasAttribute("data-scroll-show"),
        r = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        s = e.dataset.scroll ? e.dataset.scroll : 1;
      let a,
        n = 0;
      document.addEventListener("windowScroll", function (l) {
        const c = window.scrollY;
        clearTimeout(a),
          c >= s
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              !t.classList.contains("_scroll") && t.classList.add("_scroll"),
              o &&
                (c > n
                  ? (e.classList.contains("_header-show") &&
                      e.classList.remove("_header-show"),
                    !t.classList.contains("_scroll") &&
                      t.classList.remove("_scroll"))
                  : (!e.classList.contains("_header-show") &&
                      e.classList.add("_header-show"),
                    !t.classList.contains("_scroll") &&
                      t.classList.add("_scroll")),
                (a = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, r))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t.classList.contains("_scroll") && t.classList.remove("_scroll"),
              o &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (n = c <= 0 ? 0 : c);
      });
    })();
})();

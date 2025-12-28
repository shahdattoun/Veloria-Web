(() => {
  const inputs = document.querySelectorAll('input[name="box-item"]');
  if (!inputs.length) return;

  const KEY = "veloria_gift_box_selection_v1";

  const labels = {
    cups: "Cups",
    chocolate: "Chocolate",
    candy: "Candy",
    care: "Care Products",
    flowers: "Flowers",
    perfume: "Perfumes",
    teddy: "Teddy Bears",
    accessories: "Accessories",
    makeup: "Makeup"
  };

  const optionsBox = document.querySelector(".box-options");
  if (!optionsBox) return;

  const wrap = document.createElement("div");
  wrap.style.maxWidth = "700px";
  wrap.style.margin = "14px auto";
  wrap.style.padding = "12px";
  wrap.style.border = "1px solid #ddd";
  wrap.style.borderRadius = "10px";
  wrap.style.background = "#fff";
  wrap.style.textAlign = "center";

  const summary = document.createElement("div");
  summary.style.fontWeight = "600";
  summary.style.marginBottom = "10px";

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.textContent = "Clear Selection";
  clearBtn.style.padding = "8px 14px";
  clearBtn.style.border = "1px solid #ccc";
  clearBtn.style.borderRadius = "8px";
  clearBtn.style.cursor = "pointer";
  clearBtn.style.background = "#fff";

  wrap.appendChild(summary);
  wrap.appendChild(clearBtn);
  optionsBox.parentElement.appendChild(wrap);

  const getSelected = () =>
    Array.from(document.querySelectorAll('input[name="box-item"]:checked')).map(
      (el) => el.value
    );

  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  const render = (arr) => {
    if (!arr.length) {
      summary.textContent = "Your selection: none";
      return;
    }
    summary.textContent =
      "Your selection: " + arr.map((v) => labels[v] || v).join(", ");
  };

  const update = () => {
    const arr = getSelected();
    save(arr);
    render(arr);
  };

  const apply = (arr) => {
    inputs.forEach((i) => {
      i.checked = arr.includes(i.value);
    });
  };

  const init = () => {
    const saved = load();
    apply(saved);
    render(getSelected());
  };

  inputs.forEach((i) => i.addEventListener("change", update));

  clearBtn.addEventListener("click", () => {
    inputs.forEach((i) => (i.checked = false));
    update();
  });

  init();
})();


(() => {
  const inputs = document.querySelectorAll('input[name="box-item"]');
  const summary = document.getElementById("boxSummary");
  const clearBtn = document.getElementById("clearBox");

  if (!inputs.length || !summary || !clearBtn) return;

  const names = {
    cups: "كاسات",
    chocolate: "شوكولاتة",
    candy: "كاندي",
    care: "منتجات عناية",
    flowers: "ورود",
    perfume: "عطور",
    teddy: "دباديب",
    accessories: "إكسسوارات",
    makeup: "مكياج"
  };

  const save = (arr) => localStorage.setItem("boxSelection", JSON.stringify(arr));
  const load = () => JSON.parse(localStorage.getItem("boxSelection") || "[]");

  const render = (arr) => {
    if (!arr.length) {
      summary.textContent = "ما اخترتي أي عنصر بعد.";
      return;
    }
    summary.textContent = "اختيارك: " + arr.map(x => names[x]).join("، ");
  };

  const update = () => {
    const selected = [...document.querySelectorAll('input[name="box-item"]:checked')]
      .map(el => el.value);
    save(selected);
    render(selected);
  };

  inputs.forEach(el => el.addEventListener("change", update));

  const saved = load();
  inputs.forEach(el => (el.checked = saved.includes(el.value)));
  render(saved);

  clearBtn.addEventListener("click", () => {
    inputs.forEach(i => (i.checked = false));
    save([]);
    render([]);
  });
})();

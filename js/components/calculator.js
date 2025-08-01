export function initCalculator() {
  const premiumInput = document.getElementById("premium-input");
  const calculateBtn = document.getElementById("calculate-btn");
  const cashbackAmount = document.getElementById("cashback-amount");

  function calculateCashback() {
    const premium = parseFloat(premiumInput.value) || 0;
    const cashback = premium * 0.25; // 25% cash back
    cashbackAmount.textContent = `₹${cashback.toLocaleString("en-IN")}`;
  }

  calculateBtn.addEventListener("click", calculateCashback);
  premiumInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      calculateCashback();
    }
  });

  // Initialize calculator with example value
  premiumInput.value = "100000";
  calculateCashback();
}
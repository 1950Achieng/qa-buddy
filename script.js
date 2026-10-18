

function addTestCase() {
    const testName = document.getElementById("testName").value;
    const expected = document.getElementById("expected").value;
    const status = document.getElementById("status").value;

    if (testName === "" || expected === "") {
        alert("Please fill in all fields!");
        return;
    }

    const testList = document.getElementById("testList");

    const testCase = document.createElement("div");
    testCase.className = "test-card";
    if (status === "Passed") {
    testCase.classList.add("passed");
} else {
    testCase.classList.add("failed");
}
    testCase.dataset.status = status;

    const name = document.createElement("h3");
    name.textContent = testName;

    const result = document.createElement("p");
    result.textContent = "Expected result: " + expected;

    const testStatus = document.createElement("p");
    testStatus.textContent = "Status: " + status;

    testCase.appendChild(name);
    testCase.appendChild(result);
    testCase.appendChild(testStatus);
    const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.className = "delete-btn";

deleteButton.onclick = function() {
    testCase.remove();
updateStats();
saveTests();
};

testCase.appendChild(deleteButton);

    testList.appendChild(testCase);
    saveTests();
    updateStats();

    document.getElementById("testName").value = "";
    document.getElementById("expected").value = "";
}

function updateStats() {
    const testCards = document.querySelectorAll(".test-card");

    let passed = 0;
    let failed = 0;

    testCards.forEach(function(card) {
        if (card.dataset.status === "Passed") {
            passed++;
        } else {
            failed++;
        }
    });

    document.getElementById("totalTests").textContent = testCards.length;
    document.getElementById("passedTests").textContent = passed;
    document.getElementById("failedTests").textContent = failed;
}

function saveTests() {
    const tests = [];

    document.querySelectorAll(".test-card").forEach(function(card) {
        tests.push({
            name: card.querySelector("h3").textContent,
            expected: card.querySelectorAll("p")[0].textContent.replace("Expected result: ", ""),
            status: card.dataset.status
        });
    });

    localStorage.setItem("qaTests", JSON.stringify(tests));
}

function loadTests() {
    const tests = JSON.parse(localStorage.getItem("qaTests")) || [];

    tests.forEach(function(test) {
        document.getElementById("testName").value = test.name;
        document.getElementById("expected").value = test.expected;
        document.getElementById("status").value = test.status;

        addTestCase();
    });
}

loadTests();

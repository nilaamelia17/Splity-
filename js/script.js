// tipe split
const splitButtons =
    document.querySelectorAll(".split-options button");

const splitSections =
    document.querySelectorAll(".split-section");


splitButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {
        splitSections.forEach(function(section) {
            section.classList.add("hidden");
        });

        splitSections[index].classList.remove("hidden");

        updatePeopleNames();
    });
});

// baca inputan nama
function getPeople() {

    const personInputs =
        document.querySelectorAll(".person-input");

    const people = [];
        personInputs.forEach(function(input) {

        const name = input.value.trim();
        if (name !== "") {
            people.push(name);
        }
    });
    return people;
}
// update nama 
function updatePeopleNames() {
    const people = getPeople();

// tipe by item
    const itemPeopleContainers =
        document.querySelectorAll(".item-people");

    itemPeopleContainers.forEach(function(container) {

        container.innerHTML = "";
        people.forEach(function(person) {

            const label =
                document.createElement("label");

            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            label.appendChild(checkbox);
            label.appendChild(
                document.createTextNode(" " + person)
            );
            container.appendChild(label);
        });
    });

// tipe custom
    const customPeople =
        document.querySelector(".custom-people");

    if (customPeople) {

        customPeople.innerHTML = "";
        people.forEach(function(person) {

            const personDiv =
                document.createElement("div");

            personDiv.classList.add(
                "custom-person"
            );

            const name =
                document.createElement("span");
            name.textContent = person;

            const input =
                document.createElement("input");

            input.type = "text";
            input.placeholder = "Rp 0";

            personDiv.appendChild(name);
            personDiv.appendChild(input);
            customPeople.appendChild(personDiv);
        });
    }
}

// tambah orang
const peopleList =
    document.getElementById("people-list");

const addPersonButton =
    document.getElementById("add-person");


if (peopleList && addPersonButton) {
    const firstPersonInput =
        document.querySelector(".person-input");

    if (firstPersonInput) {
        firstPersonInput.addEventListener(
            "input",
            function() {
                updatePeopleNames();
            }
        );
    }

    addPersonButton.addEventListener(
        "click",
        function() {
            const newPerson =
                document.createElement("input");

            newPerson.type = "text";
            newPerson.classList.add(
                "person-input"
            );
            newPerson.placeholder = "Name";
            peopleList.appendChild(
                newPerson
            );
            newPerson.addEventListener(
                "input",
                function() {
                    updatePeopleNames();
                }
            );
        }
    );
}

// tambah item
const addItemButton =
    document.getElementById("add-item");

const itemList =
    document.querySelector(".item-list");

if (addItemButton && itemList) {

    addItemButton.addEventListener(
        "click",
        function() {
            const itemCard =
                document.createElement("div");

            itemCard.classList.add(
                "item-card"
            );

            // nama item nya
            const itemName =
                document.createElement("input");

            itemName.type = "text";
            itemName.placeholder =
                "Item name";

            /* harga item */
            const itemPrice =
                document.createElement("input");

            itemPrice.type = "text";
            itemPrice.placeholder ="Rp 0";

            /* QUESTION */
            const question =
                document.createElement("p");    

            question.textContent =
                "Who had this?";

            /* PEOPLE */
            const itemPeople =
                document.createElement("div");
            itemPeople.classList.add(
                "item-people"
            );
            const people =
                getPeople();

            people.forEach(function(person) {
                const label =
                    document.createElement("label");

                const checkbox =
                    document.createElement("input");

                checkbox.type = "checkbox";

                label.appendChild(checkbox);
                label.appendChild(
                    document.createTextNode(
                        " " + person
                    )
                );
                itemPeople.appendChild(
                    label
                );
            });

            /* BUILD CARD */

            itemCard.appendChild(
                itemName
            );
            itemCard.appendChild(
                itemPrice
            );
            itemCard.appendChild(
                question
            );
            itemCard.appendChild(
                itemPeople
            );
            itemList.appendChild(
                itemCard
            );
        }
    );
}

// button calculate
const calculateButtons =
    document.querySelectorAll(".calculate-btn");

if (calculateButtons.length > 0) {

    // equal
    if (calculateButtons[0]) {

        calculateButtons[0].addEventListener(
            "click",
            function() {
                const totalInput =
                    document.getElementById(
                        "equal-total"
                    );
                const taxInput =
                    document.getElementById(
                        "equal-tax"
                    );
                const serviceInput =
                    document.getElementById(
                        "equal-service"
                    );

                const total =
                    parseFloat(totalInput.value.replace(/[^0-9]/g,"")
                    ) || 0;

                const tax =
                    parseFloat(taxInput.value.replace(/[^0-9.]/g,"")
                    ) || 0;

                const service =
                    parseFloat(serviceInput.value.replace(/[^0-9.]/g, "")
                    ) || 0;

                const people =
                    getPeople();
                if (people.length === 0) {
                    alert(
                        "Add at least one person."
                    );
                    return;
                }
                if (total <= 0) {
                    alert(
                        "Enter your total bill."
                    );
                    return;
                }
            
                const taxAmount =
                    total * (tax / 100);
                const serviceAmount =
                    total * (service / 100);
                const grandTotal =
                    total +
                    taxAmount +
                    serviceAmount;
                const eachPerson =
                    grandTotal /
                    people.length;
                const peopleAmounts = {};

                people.forEach(function(person) {
                    peopleAmounts[person] =
                        eachPerson;
                });
                const result = {

                    mode: "equally",
                    billName: document.getElementById("bill-name").value.trim()|| "Your bill",                                                   
                    total: total,
                    tax: taxAmount,
                    service: serviceAmount,
                    grandTotal: grandTotal,
                    people: people,
                    peopleAmounts:
                        peopleAmounts
                };
                localStorage.setItem(
                    "splitlyResult",
                    JSON.stringify(result)
                );
                window.location.href =
                    "total.html";
            }
        );
    }

// by item
    if (calculateButtons[1]) {

        calculateButtons[1].addEventListener(
            "click",
            function() {
                const people =
                    getPeople();

                if (people.length === 0) {
                    alert( "Add at least one person.");
                    return;
                }
                const itemCards =
                    document.querySelectorAll(".item-card");

                const peopleSubtotal = {};
                people.forEach(function(person) {
                    peopleSubtotal[person] =
                        0;
                });
                let hasItem = false;

                for (let i = 0; i < itemCards.length; i++){
                    const card =
                        itemCards[i];

                    const inputs =
                        card.querySelectorAll(
                            "input"
                        );
                    const itemName =
                        inputs[0].value.trim();

                    const itemPrice =
                        parseFloat(
                            inputs[1].value.replace(/[^0-9]/g,"")) || 0;
            
                    const checkedPeople =
                        card.querySelectorAll( ".item-people input:checked");
                           
                    if ( itemName === "" && itemPrice === 0){
                        continue
                    }
                    if ( itemName === "" || itemPrice <= 0) {
                       alert("Complete the item name and price.");
                        return;
                    }

                    if (checkedPeople.length === 0) {
                        alert( "Choose who had " + itemName + ".");
                        return;
                    }

                    hasItem = true;
                    const share =
                        itemPrice /
                        checkedPeople.length;

                    checkedPeople.forEach(
                        function(checkbox) {
                            const label =
                                checkbox.parentElement;

                            const person =
                                label.textContent.trim();
                            if (peopleSubtotal[person] !== undefined){
                                peopleSubtotal[person] += share;
                            }
                        }
                    );
                }

                if (!hasItem) {
                    alert("Add at least one item.");
                    return;
                }
                let subtotal = 0;

                people.forEach(function(person) {
                    subtotal +=
                        peopleSubtotal[person];
                });

                const taxInput =
                    document.getElementById("item-tax");
                const serviceInput =
                    document.getElementById( "item-service" );                    
                const tax =
                    parseFloat(
                        taxInput.value.replace(   /[^0-9.]/g,"")) || 0;
                const service =
                    parseFloat(
                        serviceInput.value.replace(  /[^0-9.]/g,"")) || 0;
                const taxAmount =
                    subtotal * (tax / 100);
                const serviceAmount =
                    subtotal * (service / 100);
                const grandTotal =
                    subtotal + taxAmount + serviceAmount;                                        
                const peopleAmounts = {};

                people.forEach(function(person) {
                    const personSubtotal =
                        peopleSubtotal[person];
                    const proportion =
                        personSubtotal / subtotal;
                    const personTax =
                        taxAmount * proportion;
                    const personService =
                        serviceAmount * proportion;
                       
                    peopleAmounts[person] =
                        personSubtotal + personTax + personService;
                });

                const result = {
                    mode: "byItem",

                    billName:
                        document.getElementById( "bill-name").value.trim()|| "Your bill",

                    total: subtotal,
                    tax: taxAmount,
                    service: serviceAmount,
                    grandTotal: grandTotal,
                    people: people,
                    peopleAmounts:
                        peopleAmounts
                };

                localStorage.setItem("splitlyResult", JSON.stringify(result));
                window.location.href = "total.html";
            }
        );
    }

// custom
    if (calculateButtons[2]) {

        calculateButtons[2].addEventListener(
            "click",
            function() {

                const people =
                    getPeople();
                if (people.length === 0) {
                    alert("Add at least one person.");
                    return;
                }
                const customPeople =
                    document.querySelectorAll(".custom-person");                    
                const peopleSubtotal = {};

                let subtotal = 0;
               
                // bayaran masing'
                customPeople.forEach(
                    function(personDiv) {

                        const nameElement =
                            personDiv.querySelector("span");
                        const input =
                            personDiv.querySelector("input")
                       
                        if ( !nameElement || !input){
                            return;
                        }

                        const person =
                            nameElement.textContent.trim();
                        const amount =
                            parseFloat(input.value.replace(/[^0-9]/g,""))|| 0;

                        peopleSubtotal[person] = amount;
                        subtotal += amount;
                    }
                );

                // validasi
                if (subtotal <= 0) {
                    alert( "Enter the amount for each person.")               
                    return;
                }

                // TAX DAN SERVIS
                const taxInput =
                    document.getElementById(
                        "custom-tax"
                    );
                const serviceInput =
                    document.getElementById(
                        "custom-service"
                    );
                const tax =
                    parseFloat(taxInput.value.replace(/[^0-9.]/g,""))|| 0;

                const service =
                    parseFloat( serviceInput.value.replace(/[^0-9.]/g,""))|| 0;
                       
                const taxAmount = subtotal * (tax / 100);
                const serviceAmount =  subtotal * (service / 100);
                const grandTotal = subtotal + taxAmount + serviceAmount; 

                // akhir perhitungan 
                const peopleAmounts = {};

                people.forEach(function(person) {
                    const personSubtotal =
                        peopleSubtotal[person] || 0;

                    const proportion = personSubtotal / subtotal;
                    const personTax = taxAmount *proportion;                    
                    const personService = serviceAmount * proportion;

                    peopleAmounts[person] =personSubtotal + personTax + personService;
                });

                //simpen total/result
                const result = {

                    mode: "custom",

                    billName:
                        document.getElementById("bill-name").value.trim()|| "Your bill",                            
                    total: subtotal,
                    tax: taxAmount,
                    service: serviceAmount,
                    grandTotal: grandTotal,
                    people: people,
                    peopleAmounts:
                        peopleAmounts
                };

                localStorage.setItem("splitlyResult", JSON.stringify(result));
                window.location.href =  "total.html";
            }
        );
    }
}

// page total
const savedResult =
    localStorage.getItem( "splitlyResult");

const grandTotalElement =
    document.getElementById("grand-total");
        
if ( savedResult && grandTotalElement) {
    const result =
        JSON.parse(savedResult);

    // nama bill
    const billNameResult =
        document.getElementById("bill-name-result");

    if (billNameResult) {
        billNameResult.textContent = result.billName;
    }
    /* GRAND TOTAL */
    grandTotalElement.textContent = "Rp " +
        result.grandTotal.toLocaleString("id-ID");

    /* PEOPLE */
    const peopleTotal =
        document.getElementById("people-total");

    if (peopleTotal) {
        peopleTotal.innerHTML = "";

        result.people.forEach(
            function(person) {

                const personRow =
                    document.createElement("div");
                    personRow.classList.add("custom-person");
                const name =
                    document.createElement("span");

                name.textContent =  person;
                   
                const amount =
                    document.createElement( "span");
                const personAmount =
                    result.peopleAmounts[person]|| 0;

                amount.textContent = "Rp " +                    
                    personAmount.toLocaleString("id-ID");

                personRow.appendChild(name);
                personRow.appendChild(amount);
                peopleTotal.appendChild(personRow);
            }
        );
    }
}

// copy total
const copyButton =
    document.getElementById("copy-result");

if (copyButton) {
    copyButton.addEventListener(
        "click",
        async function() {

            const saved =
                localStorage.getItem("splitlyResult");

            if (!saved) {
                alert("No bill result found.");
                return;
            }

            const data = JSON.parse(saved);
            let text = "Splitly! — " + data.billName + "\n\n";
            
            text += "Total: Rp " + data.grandTotal.toLocaleString("id-ID")+"\n\n";
            text += "Everyone pays:\n";
            
            data.people.forEach(
                function(person) {

                    text += person + ": Rp " +(data.peopleAmounts[person]|| 0)
                        .toLocaleString( "id-ID" ) +"\n";                                                                  
                }
            );
            try {
                await navigator.clipboard.writeText(text);
                    
                copyButton.textContent = "Copied! ✓";                    
                setTimeout(function() {copyButton.textContent = "Copy result";}, 1500);      
            } catch (error) {

                alert("Couldn't copy the result.");
            }
        }
    );
}

// share total/result
const shareButton =
    document.getElementById("share-result")

if (shareButton) {
    shareButton.addEventListener(
        "click",
        async function() {

            const saved = localStorage.getItem("splitlyResult");
            if (!saved) {
                alert("No bill result found.");
                return;
            }

            const data = JSON.parse(saved);
                let text ="Splity! — " + data.billName + "\n\n";                                                           
                    text +="Total: Rp " + data.grandTotal.toLocaleString("id-ID") + "\n\n";
                    text +="Everyone pays:\n";
                
            data.people.forEach(
                function(person) {

                    text += person + ": Rp " + (data.peopleAmounts[person]|| 0 )
                        .toLocaleString("id-ID") + "\n";
                }
            );

            if (navigator.share) {

                try {
                    await navigator.share({
                        title: "Splitly! — " + data.billName, text: text
                    });
                } catch (error) {
                    // user cancelled share
                }

            } else {

                try {
                    await navigator.clipboard.writeText(V);
                    alert("Sharing isn't supported here, so the result has been copied instead.");
                } catch (error) {

                    alert("Couldn't share the result.");
                }
            }
        }
    );
}

// bil baru
const newBillButton =
    document.getElementById("new-bill");

if (newBillButton) {
    newBillButton.addEventListener(
        "click",
        function() {

            localStorage.removeItem("splitlyResult");
            window.location.href = "split.html";
        }
    );
}
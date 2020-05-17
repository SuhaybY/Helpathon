import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Hackathon from "./hackathon";

export default function HackBudget() {
    const [cost, setCost] = useState();
    const [total, setTotal] = useState(0);
    const [left, setLeft] = useState(0);
    const [sItems, setItems] = useState([]);

    let { hackID } = useParams();

    async function getData() {
        const hackObj = await Hackathon.getHackathonFromId(hackID);
        setTotal(hackObj.budget);
        setLeft(hackObj.budget);
        console.log("Hack total: " + total + ". Obtained following hackathon: ");
        console.log(hackObj);
    }

    async function getBudgetItems() {
        const itemObj = await Hackathon.getBudgetItems(hackID);
        // console.log("Items obj:");
        // console.log(itemObj);
        var items = [];
        Object.keys(itemObj).forEach(function(key) {
            let nestedData = [key]
            Object.keys(itemObj[key]).forEach(function(key2) {
                nestedData.push(itemObj[key][key2]);
            });
            items.push(nestedData);
            // console.log("Adding:" + nestedData);
            // setItems(sItems => [...sItems, ...nestedData]);
        });
        setItems( sItems => [...sItems, ...items] );
        // sItems = items;

        // setItems([items].concat(sItems)); // prepend to React State
        // setItems(sItems => [...sItems, items]);
        // setItems( sItems => sItems.concat(items) );
        console.log("Items:");
        console.log(items);
        console.log("Items fully loaded:");
        console.log(sItems);
        console.log(sItemsRef.current);
    }

    const sItemsRef = useRef(sItems);

    useEffect(() => {
        getData();
        getBudgetItems();
    }, []);

    useEffect(() => {
        sItemsRef.current = sItems;
        console.log("Ref:");
        console.log(sItemsRef.current);
    }, [sItems]);

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("Submit item:");
        console.log(cost);
        setLeft(left => left - cost.price);
        Hackathon.updateBudget(cost, hackID, 1);
        
        let sItemsCopy = [...sItems, [cost.name, 1, cost.price]];
        setItems(sItemsCopy);
    }

    function setIncrement(sItem, index){
        setLeft(left => left - parseInt(sItem[2])); 
        Hackathon.updateBudget({name: sItem[0], price: sItem[2]}, hackID, 1);
        let sItemsCopy = [...sItems];
        sItemsCopy[index][1] = sItemsCopy[index][1] + 1;
        setItems(sItemsCopy);
    }

    function setDecrement(sItem, index){
        setLeft(left => left + parseInt(sItem[2])); 
        Hackathon.updateBudget({name: sItem[0], price: sItem[2]}, hackID, -1);
        let sItemsCopy = [...sItems];
        sItemsCopy[index][1] = sItemsCopy[index][1] - 1;
        setItems(sItemsCopy);
    }

    function deleteItem(sItem){
        Hackathon.updateBudget({name: sItem[0], price: sItem[2]}, hackID, -1, true);
        setItems(sItems.filter(item => item[0] !== sItem[0]));
    }

    return (
        <div>
            <ul>
                {(sItems).map( (sItem, index) => (
                    <li key={index}>
                        <div>
                            <div>Name: {sItem[0]}</div>
                            <div>Number: {sItem[1]}</div>
                            <div>Price: {sItem[2]}</div>
                        </div>
                        <button onClick={e => {setIncrement(sItem,index)}}>Increment</button>
                        <button onClick={e => {setDecrement(sItem,index)}}>Decrement</button>
                        <button onClick={e => {deleteItem(sItem,index)}}>Delete Item</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={submitForm}>
                <div>Budget Planner</div>
                <div>Start Amount: {total}</div>
                <div>Left: {left}</div>
                <input
                    type="text"
                    name="costName"
                    placeholder="Budget"
                    onChange={e => setCost( {...cost, name: e.target.value} )}
                />
                <input
                    type="number"
                    name="costAmount"
                    placeholder="$1000"
                    onChange={e => { setCost( {...cost, price: e.target.value}); } }
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
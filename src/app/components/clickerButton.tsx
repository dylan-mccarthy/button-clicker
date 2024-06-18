'use client';

import { useState, useEffect } from "react";

export default function ClickerButton() {
    const [money, setMoney] = useState(() => typeof window !== 'undefined' ? Number(localStorage.getItem("money")) || 0 : 0);
    const [count, setCount] = useState(() => typeof window !== 'undefined' ? Number(localStorage.getItem("count")) || 0 : 0);
    const [autoClickers, setAutoClickerCount ] = useState(() => typeof window !== 'undefined' ? Number(localStorage.getItem("autoClickers")) || 0 : 0);
    const [autoClickerClickers, setAutoClickerClickerCount ] = useState(() => typeof window !== 'undefined' ? Number(localStorage.getItem("autoClickerClickers")) || 0 : 0);

    useEffect(() => {
        if(typeof window !== 'undefined') {
            localStorage.setItem("money", money.toString());
        }
    }, [money]);

    useEffect(() => {
        if(typeof window !== 'undefined') {
            localStorage.setItem("count", count.toString());
        }
    }, [count]);

    useEffect(() => {
        if(typeof window !== 'undefined') {
            localStorage.setItem("autoClickers", autoClickers.toString());
        }
    }, [autoClickers]);

    useEffect(() => {
        if(typeof window !== 'undefined') {
            localStorage.setItem("autoClickerClickers", autoClickerClickers.toString());
        }
    }, [autoClickerClickers]);

    function handleClick(name: string, amount: number = 1) {
        switch(name) {
            case "base":
                setCount(count + amount);
                console.log("Button clicked " + count + " times");
                break;
            case "autoClicker":
                setMoney(money - 10);
                setAutoClickerCount(autoClickers + amount);
                console.log("Auto-clicker clicked " + autoClickers + " times");
                break;
            case "autoClickerClicker":
                setMoney(money - 1000);
                setAutoClickerClickerCount(autoClickerClickers + amount);
                console.log("Auto-clicker-clicker clicked " + autoClickerClickers + " times");
                break;
        }
    }
    
    useEffect(() => 
    {
        const interval = setInterval(() => {
            handleClick("base", autoClickers);
            handleClick("autoClicker", autoClickerClickers);
        }, 1000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMoney(money + (count * 0.01));
        }, 1000);
        return () => clearInterval(interval);
    });

    function reset() {
        setCount(0);
        setAutoClickerCount(0);
        setAutoClickerClickerCount(0);
    }

    return (
    <div className="flex flex-col items-center justify-center">
        <p className="text-blue-500">Money: ${money.toFixed(2)}</p>
        {count > 0 && <p className="text-blue-500">Button clicked {count} times</p>}
        <button onClick={ () => handleClick("base") } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Click me!
        </button>
        {
            autoClickers > 0 && <p className="text-blue-500">Auto-clicker clicked {autoClickers} times</p>
        }
        {
            count > 10 && <button onClick={ () => handleClick("autoClicker") } 
            className={`font-bold py-2 px-4 rounded ${money > 10 ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-300'}`}
            disabled={money <= 10}>
            Auto-clicker $10
            </button>
        }
        {
            autoClickerClickers > 0 && <p className="text-blue-500">Auto-clicker-clicker clicked {autoClickerClickers} times</p>
        }
        {
            autoClickers > 10 && <button onClick={ () => handleClick("autoClickerClicker") } 
            className={`font-bold py-2 px-4 rounded ${money > 1000 ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-300'}`}
            disabled={money <= 1000}>
            Auto-clicker-clicker $1000
            </button>
        }
        <button onClick={reset} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Reset
        </button>
    </div>
    );
}
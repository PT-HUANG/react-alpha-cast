import styled from "styled-components";
import logo from "../assets/images/logo.png";
import Category from "./Category";
import AddCategory from "./AddCategory";
import { useState } from "react";

const dummyData = [
  {
    id: 0,
    emoji: "🚌",
    content: "通勤清單",
    isSelected: true,
  },
  {
    id: 1,
    emoji: "📚",
    content: "學習清單",
    isSelected: false,
  },
  {
    id: 2,
    emoji: "💤",
    content: "睡前清單",
    isSelected: false,
  },
  {
    id: 3,
    emoji: "🏘️",
    content: "我的 Podcast",
    isSelected: false,
  },
  {
    id: 4,
    emoji: "❤️",
    content: "已收藏",
    isSelected: false,
  },
];

function Navbar() {
  const [category, setCategory] = useState(dummyData);

  function handleSelect(id) {
    const nextCategory = category.map((c) => {
      if (c.id === id) {
        return { ...c, isSelected: true };
      } else return { ...c, isSelected: false };
    });
    setCategory(nextCategory);
  }

  function handleSave(newTitle, id) {
    const nextCategory = category.map((c) => {
      if (c.id === id) {
        return { ...c, content: newTitle };
      } else return c;
    });
    setCategory(nextCategory);
  }

  function handleDelete(id) {
    let nextCategory = category.filter((c) => c.id !== id);
    nextCategory = nextCategory.map((c, index) => {
      if (index === 0) {
        return { ...c, isSelected: true };
      } else return c;
    });
    console.log(nextCategory);
    setTimeout(() => {
      setCategory(nextCategory);
    }, 0);
  }

  function handleCreate(newId, title) {
    let nextCategory = [
      ...category,
      {
        id: newId,
        emoji: "🔰",
        content: title,
        isSelected: false,
      },
    ];
    setTimeout(() => {
      setCategory(nextCategory);
    }, 0);
  }

  return (
    <div className="navbar_container">
      <img src={logo} className="navbar_logo" alt="logo" />
      <hr className="navbar_hr" />
      {category.map((data) => {
        return (
          <Category
            key={data.id}
            id={data.id}
            emoji={data.emoji}
            content={data.content}
            isSelected={data.isSelected}
            onClick={() => {
              handleSelect(data.id);
            }}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        );
      })}
      <AddCategory onCreate={handleCreate} />
    </div>
  );
}

export default Navbar;

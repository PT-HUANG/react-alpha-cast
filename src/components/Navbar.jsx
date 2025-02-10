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
  const [categories, setCategories] = useState(dummyData);

  function handleSelect(id) {
    const nextCategory = categories.map((c) => {
      if (c.id === id) {
        return { ...c, isSelected: true };
      } else return { ...c, isSelected: false };
    });
    setCategories(nextCategory);
  }

  function handleSave(newTitle, id, emoji) {
    const nextCategory = categories.map((c) => {
      if (c.id === id) {
        return { ...c, emoji, content: newTitle };
      } else return c;
    });
    setCategories(nextCategory);
  }

  function handleDelete(id) {
    let nextCategory = categories.filter((c) => c.id !== id);
    nextCategory = nextCategory.map((c, index) => {
      if (index === 0) {
        return { ...c, isSelected: true };
      } else return c;
    });
    setCategories(nextCategory);
  }

  function handleCreate(newId, title) {
    let nextCategory = [
      ...categories,
      {
        id: newId,
        emoji: "🔰",
        content: title,
        isSelected: false,
      },
    ];
    setCategories(nextCategory);
  }

  return (
    <div className="navbar_container">
      <img src={logo} className="navbar_logo" alt="logo" />
      <hr className="navbar_hr" />
      {categories.map((data) => {
        return (
          <Category
            key={data.id}
            id={data.id}
            emoji={data.emoji}
            content={data.content}
            isSelected={data.isSelected}
            onSelect={handleSelect}
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

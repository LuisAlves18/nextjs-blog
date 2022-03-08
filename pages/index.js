import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { getSortedPostsData } from "../lib/posts";
import { useState } from "react";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
} */
export async function getServerSideProps() {
  const allUsers = await prisma.user.findMany({
    include: {
      post: false,
      profile: false,
    },
  });
  const allPosts = await prisma.post.findMany({})
  return {
    props: {
      data: allUsers,
    },
  };
}

export default function Home({ data }) {
  const [formData, setFormData] = useState({});
  async function saveUser(e) {
    e.preventDefault();
    console.log(formData.name);
    const response = await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        post: {
          create: { title: "Hello World" },
        },
        profile: {
          create: { bio: "I like turtles" },
        },
      }),
    });
    return await response.json();
  }

  const [formData1, setFormData1] = useState({});
  async function editUser(e) {
    e.preventDefault();
    console.log(formData1.bio);
    const response = await fetch("/api/editUser", {
      method: "PUT",
      body: JSON.stringify({
        bio: formData1.bio,
        userId: formData1.userId,
      }),
    });
    return await response.json();
  }

  async function deleteUser(userId) {
    console.log(userId);
    const response = await fetch("/api/deleteUser", {
      method: "DELETE",
      body: JSON.stringify({
        id: userId,
      }),
    });
    return await response.json(response);
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {data.map(({ id, name, email, profile }) => (
              <li className={utilStyles.listItem} key={id}>
                <br />
                <ul>name</ul>
                <ul>Bio:</ul>
                <ul>email</ul>
                <ul>
                  <button onClick={()=>deleteUser(id)}>Delete</button>
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <br />
      <section>
        <form onSubmit={saveUser}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <button type="submit">Add User</button>
        </form>
      </section>
      <section>
        <form onSubmit={editUser}>
          <input
            type="bio"
            placeholder="bio"
            onChange={(e) =>
              setFormData1({ ...formData1, bio: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="user Id"
            onChange={(e) =>
              setFormData1({ ...formData1, userId: e.target.value })
            }
          />
          <button type="submit">edit bio</button>
        </form>
      </section>
    </Layout>
  );
}

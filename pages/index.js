import styled from 'styled-components'
import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer'

const SubTitle = styled.h2`
  background-color: var(--primary);
  color: white;
  display: inline-block;
  padding: 5px;
`

export default function Home(props) {
  console.log(props);
  return ( 
  <div>
    <header className="headerContainer">
      <img src={props.avatar_url} />
      <Link href="/sobre">
        <a>
          <h1>PedroDev Blog</h1>
        </a>
      </Link>
    </header>

    <section className="postsContainer">
      <SubTitle>Posts</SubTitle>
      <article className="postsContainer__post">
        <a href="/">
          Alura.js 01!
        </a>
        <p>
          O que eu aprendi com o CDFTV e a Alura nesse episódio show!
        </p>
      </article> 
    </section>

    <section className="postsContainer">
      <SubTitle>Repositórios Favoritos</SubTitle>
        {
          props.repos.map((project) => {
            return (
              <article
              key={project.repo}
              className="postsContainer__post">
              <a href="/">
                {project.repo}
              </a>
              <p>
              {project.description}
              </p>
            </article>
            )
          })
        }
    </section>
        <Footer />
  </div>
  )
}

export async function getStaticProps() {
  const githubResponse = await fetch('https://api.github.com/users/pedrontc').then(res => res.json())
  
  const repos = await fetch('https://gh-pinned-repos.now.sh/?username=pedrontc').then(res => res.json())

  return {
    props: {
      avatar_url: githubResponse.avatar_url,
      repos,
    }
  }
}
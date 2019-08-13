import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`;

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 10px;
`;

const MarkerHeader = styled.h3`
  margin-bottom: 10px;
`;

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 10px;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <Content>
        <h1>Blog</h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <HeaderLink to={node.fields.path}>
              <MarkerHeader>{node.frontmatter.title} </MarkerHeader>
              <div>
                <ArticleDate>{node.frontmatter.date}</ArticleDate>
                <ReadingTime> - {node.fields.readingTime.text}</ReadingTime>
              </div>
              <p>{node.excerpt}</p>
            </HeaderLink>
          </div>
        ))}
      </Content>
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
            path
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`;

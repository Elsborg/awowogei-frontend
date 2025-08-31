"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const LogoWrapper = styled.div`
  height: 48px;
  width: 48px;
  margin-right: 1rem;
  position: relative;
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0f172a;
  color: white;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: #1e293b;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const SiteName = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: white;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-right: 0.5rem;
  font-size: 1rem;

  &:focus {
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #334155;
  }
`;

const Results = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #1e293b;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

export default function SearchClient() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const searchPlayer = async () => {
    setError(null);
    setStats(null);

    if (!username) {
      setError("Please enter a valid username!");
    }

    try {
      const base = process.env.Next_PUBLIC_API_BASE ?? "http://localhost:8080";
      const res = await fetch(
        `${base}/api/hiscores/${encodeURIComponent(username)}`
      );
      if (!res.ok) {
        setError("Player not found!");
        return;
      }
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  return (
    <Page>
      <Header>
        <LogoWrapper>
          <Image
            src="/awowogei_logo.webp"
            alt="Awowogei logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </LogoWrapper>
        <SiteName>Awowogei</SiteName>
      </Header>
      <Container>
        <Title>Search for a Player</Title>
        <div>
          <Input
            type="text"
            placeholder="Enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={searchPlayer}>Search</Button>
        </div>

        {error && <Results>{error}</Results>}

        {stats && (
          <Results>
            <h2>{username}</h2>
            <pre>{JSON.stringify(stats, null, 2)}</pre>
          </Results>
        )}
      </Container>
    </Page>
  );
}

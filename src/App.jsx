import React from 'react';
import EmpireBar from './components/EmpireBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DevToolsGrid from './components/DevToolsGrid';
import GamePage from './components/GamePage';
import GamePlayer from './pages/GamePlayer';
import MyLibrary from './pages/MyLibrary';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Games from './pages/Games';
import About from './pages/About';
import JsonFormatter from './pages/JsonFormatter';
import Base64Encoder from './pages/Base64Encoder';
import JwtInspector from './pages/JwtInspector';
import CssGenerator from './pages/CssGenerator';
import HashGenerator from './pages/HashGenerator';
import UrlEncoder from './pages/UrlEncoder';
import UuidGenerator from './pages/UuidGenerator';
import ColorConverter from './pages/ColorConverter';
import LoremIpsum from './pages/LoremIpsum';
import MarkdownPreviewer from './pages/MarkdownPreviewer';
import JsonToTs from './pages/JsonToTs';
import CronGenerator from './pages/CronGenerator';
import QrGenerator from './pages/QrGenerator';
import RsaGenerator from './pages/RsaGenerator';
import BcryptGenerator from './pages/BcryptGenerator';
import RegexTester from './pages/RegexTester';
import SubnetCalc from './pages/SubnetCalc';
import HexConverter from './pages/HexConverter';
import XorCipher from './pages/XorCipher';
import ChmodCalc from './pages/ChmodCalc';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <EmpireBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <DevToolsGrid />
            </>
          } />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/play/:id" element={<GamePlayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/games" element={<Games />} />
          <Route path="/categories" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/tools/json-formatter" element={<JsonFormatter />} />
          <Route path="/tools/base64-encoder" element={<Base64Encoder />} />
          <Route path="/tools/jwt-inspector" element={<JwtInspector />} />
          <Route path="/tools/css-generator" element={<CssGenerator />} />
          <Route path="/tools/hash-generator" element={<HashGenerator />} />
          <Route path="/tools/url-encoder" element={<UrlEncoder />} />
          <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="/tools/color-converter" element={<ColorConverter />} />
          <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/tools/markdown-previewer" element={<MarkdownPreviewer />} />
          <Route path="/tools/json-to-ts" element={<JsonToTs />} />
          <Route path="/tools/cron-generator" element={<CronGenerator />} />
          <Route path="/tools/qr-generator" element={<QrGenerator />} />
          <Route path="/tools/rsa-generator" element={<RsaGenerator />} />
          <Route path="/tools/bcrypt-generator" element={<BcryptGenerator />} />
          <Route path="/tools/regex-tester" element={<RegexTester />} />
          <Route path="/tools/subnet-calculator" element={<SubnetCalc />} />
          <Route path="/tools/hex-converter" element={<HexConverter />} />
          <Route path="/tools/xor-cipher" element={<XorCipher />} />
          <Route path="/tools/chmod-calculator" element={<ChmodCalc />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

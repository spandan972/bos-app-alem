const Attribution = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 1rem;
  width: 100%;
  div {
    font-size: 11px;
    color: #7b7b7b;
  }
  svg {
    width: 20px;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 86px;
  }
`;

return (
  <Attribution>
    <div>USD prices powered by CoinGecko</div>
    <a href="https://www.coingecko.com/" target="_blank">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 16H11V14H9V16ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 4C7.79 4 6 5.79 6 8H8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 5.79 12.21 4 10 4Z"
          fill="#7B7B7B"
        />
      </svg>
    </a>
  </Attribution>
);

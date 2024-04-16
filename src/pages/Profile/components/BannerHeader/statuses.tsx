const statuses: any = {
  Approved: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.7835 0.943599C10.3834 0.454917 9.6361 0.454917 9.236 0.943599L8.44604 1.90847C8.17411 2.24062 7.72052 2.36216 7.31895 2.21048L6.15238 1.76985C5.56155 1.54669 4.91436 1.92035 4.8122 2.5436L4.61051 3.77419C4.54108 4.19781 4.20904 4.52985 3.78542 4.59928L2.55484 4.80097C1.93158 4.90313 1.55792 5.55032 1.78108 6.14115L2.22171 7.30772C2.37339 7.70929 2.25185 8.16288 1.9197 8.43481L0.95483 9.22477C0.466148 9.62487 0.466147 10.3722 0.954829 10.7723L1.9197 11.5622C2.25185 11.8342 2.37339 12.2878 2.22171 12.6893L1.78108 13.8559C1.55792 14.4467 1.93158 15.0939 2.55484 15.1961L3.78542 15.3978C4.20904 15.4672 4.54108 15.7992 4.61051 16.2229L4.8122 17.4534C4.91436 18.0767 5.56155 18.4504 6.15238 18.2272L7.31895 17.7866C7.72052 17.6349 8.17411 17.7564 8.44604 18.0886L9.236 19.0535C9.6361 19.5421 10.3834 19.5421 10.7835 19.0535L11.5735 18.0886C11.8454 17.7564 12.299 17.6349 12.7006 17.7866L13.8671 18.2272C14.458 18.4504 15.1052 18.0767 15.2073 17.4534L15.409 16.2229C15.4784 15.7992 15.8105 15.4672 16.2341 15.3978L17.4647 15.1961C18.0879 15.0939 18.4616 14.4467 18.2384 13.8559L17.7978 12.6893C17.6461 12.2878 17.7677 11.8342 18.0998 11.5622L19.0647 10.7723C19.5534 10.3722 19.5534 9.62487 19.0647 9.22478L18.0998 8.43481C17.7677 8.16288 17.6461 7.70929 17.7978 7.30772L18.2384 6.14115C18.4616 5.55032 18.0879 4.90313 17.4647 4.80097L16.2341 4.59928C15.8105 4.52985 15.4784 4.19781 15.409 3.77419L15.2073 2.54361C15.1052 1.92035 14.458 1.54669 13.8671 1.76985L12.7006 2.21048C12.299 2.36216 11.8454 2.24062 11.5735 1.90847L10.7835 0.943599ZM13.5029 7.49591C13.3065 7.30179 12.9899 7.3036 12.7957 7.49996L8.92649 11.4119L7.25946 9.53742C7.07595 9.33107 6.75991 9.31256 6.55356 9.49607C6.34722 9.67958 6.3287 9.99562 6.51221 10.202L8.8858 12.8709L9.90713 11.8496L13.5073 8.20316C13.7013 8.00663 13.6994 7.69003 13.5029 7.49591Z"
          fill="#0DBFAF"
        />
      </svg>
    ),
    color: "#0E615E",
  },
  Rejected: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
          fill="#F6767A"
        />
      </svg>
    ),
    color: "#ED464F",
  },
  Pending: {
    icon: (
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.1523 0C4.63234 0 0.152344 4.48 0.152344 10C0.152344 15.52 4.63234 20 10.1523 20C15.6723 20 20.1523 15.52 20.1523 10C20.1523 4.48 15.6723 0 10.1523 0ZM10.1523 18C5.73234 18 2.15234 14.42 2.15234 10C2.15234 5.58 5.73234 2 10.1523 2C14.5723 2 18.1523 5.58 18.1523 10C18.1523 14.42 14.5723 18 10.1523 18Z"
          fill="#F4B37D"
        />
        <path
          d="M5.15234 11.5C5.98077 11.5 6.65234 10.8284 6.65234 10C6.65234 9.17157 5.98077 8.5 5.15234 8.5C4.32392 8.5 3.65234 9.17157 3.65234 10C3.65234 10.8284 4.32392 11.5 5.15234 11.5Z"
          fill="#F4B37D"
        />
        <path
          d="M10.1523 11.5C10.9808 11.5 11.6523 10.8284 11.6523 10C11.6523 9.17157 10.9808 8.5 10.1523 8.5C9.32392 8.5 8.65234 9.17157 8.65234 10C8.65234 10.8284 9.32392 11.5 10.1523 11.5Z"
          fill="#F4B37D"
        />
        <path
          d="M15.1523 11.5C15.9808 11.5 16.6523 10.8284 16.6523 10C16.6523 9.17157 15.9808 8.5 15.1523 8.5C14.3239 8.5 13.6523 9.17157 13.6523 10C13.6523 10.8284 14.3239 11.5 15.1523 11.5Z"
          fill="#F4B37D"
        />
      </svg>
    ),
    color: "#EA6A25",
  },
  Graylisted: {
    icon: (
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.15234 16H11.1523V14H9.15234V16ZM10.1523 0C4.63234 0 0.152344 4.48 0.152344 10C0.152344 15.52 4.63234 20 10.1523 20C15.6723 20 20.1523 15.52 20.1523 10C20.1523 4.48 15.6723 0 10.1523 0ZM10.1523 18C5.74234 18 2.15234 14.41 2.15234 10C2.15234 5.59 5.74234 2 10.1523 2C14.5623 2 18.1523 5.59 18.1523 10C18.1523 14.41 14.5623 18 10.1523 18ZM10.1523 4C7.94234 4 6.15234 5.79 6.15234 8H8.15234C8.15234 6.9 9.05234 6 10.1523 6C11.2523 6 12.1523 6.9 12.1523 8C12.1523 10 9.15234 9.75 9.15234 13H11.1523C11.1523 10.75 14.1523 10.5 14.1523 8C14.1523 5.79 12.3623 4 10.1523 4Z"
          fill="#7B7B7B"
        />
      </svg>
    ),
    color: "#7B7B7B",
  },
  Blacklisted: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM2 10C2 5.58 5.58 2 10 2C11.85 2 13.55 2.63 14.9 3.69L3.69 14.9C2.63 13.55 2 11.85 2 10ZM10 18C8.15 18 6.45 17.37 5.1 16.31L16.31 5.1C17.37 6.45 18 8.15 18 10C18 14.42 14.42 18 10 18Z"
          fill="#292929"
        />
      </svg>
    ),
    color: "#292929",
  },
};

export default statuses;

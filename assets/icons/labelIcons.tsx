/* eslint-disable max-len */
import { colors } from '@/styles/colors';

const getViewBox = (name: string) => {
  switch (name) {
    default:
      return '0 0 24 24';
  }
};

const getPath = (name: string, props: any) => {
  const {
    fill,
    // , stroke, stopColor, iconprimary
  } = props;
  switch (name) {
    case 'tag-icon':
      return (
        <>
          <path
            fill={fill}
            d='m15.075 10.853-4.23 4.24c-1.218 1.21-2.472 1.21-3.68 0l-.715-.722a.267.267 0 0 1 0-.377l7.534-7.534a.267.267 0 0 1 .377 0l.714.713c1.254 1.254 1.21 2.463 0 3.68Zm-2.01-5.313L5.53 13.074a.267.267 0 0 1-.377 0l-4.39-4.39A2.608 2.608 0 0 1 0 6.84V1.733C0 .776.776 0 1.733 0h5.1a2.6 2.6 0 0 1 1.843.764l4.389 4.399a.267.267 0 0 1 0 .377Zm-8.62-1.984a.888.888 0 0 0-.888-.89h-.009a.885.885 0 0 0-.882.89.888.888 0 1 0 1.779 0Z'
          />
        </>
      );
    case 'bug-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M16 14.605a.616.616 0 0 1-1.232 0 1.848 1.848 0 0 0-1.846-1.846h-.563a4.917 4.917 0 0 1-3.452 2.58.251.251 0 0 1-.291-.25V8.863A.62.62 0 0 0 8 8.247a.62.62 0 0 0-.616.615v6.228a.252.252 0 0 1-.291.248 4.917 4.917 0 0 1-3.452-2.579h-.565a1.848 1.848 0 0 0-1.846 1.846.616.616 0 0 1-1.23 0 3.08 3.08 0 0 1 3.076-3.076h.118a4.91 4.91 0 0 1-.118-1.026V9.478H.616a.616.616 0 0 1 0-1.231h2.461V6.401c0-.076.01-.14.014-.212A3.054 3.054 0 0 1 .293 4.088l-.26-.773a.616.616 0 0 1 1.166-.394l.262.78c.243.746.932 1.25 1.716 1.263l.216.003c.376-.682 1.088-1.028 2.145-1.028h4.923c1.058 0 1.77.346 2.146 1.028l.215-.003a1.828 1.828 0 0 0 1.714-1.256l.265-.786a.616.616 0 0 1 1.167.394l-.263.78a3.052 3.052 0 0 1-2.796 2.093c.003.072.014.136.014.212v1.846h2.462a.616.616 0 0 1 0 1.23h-2.462v1.026c0 .354-.047.694-.118 1.026h.117A3.08 3.08 0 0 1 16 14.605ZM5.892 2.71h4.214c.159 0 .288-.153.24-.305A2.454 2.454 0 0 0 8 .658c-1.11 0-2.042.736-2.348 1.746-.047.152.082.305.24.305Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'question-tag-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm.016 12.4a.804.804 0 0 1-.804-.8c0-.442.354-.8.796-.8h.008a.8.8 0 1 1 0 1.6Zm1.266-3.978c-.584.392-.693.61-.713.668a.6.6 0 1 1-1.138-.382c.145-.432.52-.84 1.183-1.283.816-.547.712-1.147.677-1.344a1.334 1.334 0 0 0-1.049-1.06 1.294 1.294 0 0 0-1.079.283 1.333 1.333 0 0 0-.476 1.024.6.6 0 0 1-1.2 0c0-.753.33-1.46.905-1.943a2.514 2.514 0 0 1 2.06-.545 2.537 2.537 0 0 1 2.02 2.036c.177 1.01-.246 1.914-1.19 2.546Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'like-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM5.6 11.16a.24.24 0 0 1-.24.24h-.528a.632.632 0 0 1-.632-.632v-2.96c0-.348.284-.632.632-.632h.528a.24.24 0 0 1 .24.24v3.744ZM11.695 8l-.848 2.536c-.168.512-.352.864-1.2.864H6.64a.24.24 0 0 1-.24-.24V6.95c0-.025.004-.05.012-.075l.868-2.643a.671.671 0 0 1 .632-.432c.128 0 .256.032.368.112.352.232.56.632.56 1.056v1.368h1.656c1.264 0 1.472.848 1.2 1.664Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );

    case 'vector-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M13.333 0H2.667A2.667 2.667 0 0 0 0 2.667v10.666A2.667 2.667 0 0 0 2.667 16h10.666A2.666 2.666 0 0 0 16 13.333V2.667A2.666 2.666 0 0 0 13.333 0Zm0 9.333h-2a.667.667 0 0 0-.666.667v2H5.333v-2a.667.667 0 0 0-.666-.667h-2V2.667h10.666v6.666Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );

    case 'pie-chart-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M15.736 6.978a1.082 1.082 0 0 1-.817.373H9.723A1.075 1.075 0 0 1 8.65 6.277V1.081A1.082 1.082 0 0 1 9.87.01a7.214 7.214 0 0 1 6.12 6.119c.042.304-.05.614-.254.848Zm-1.698 2.408A1.044 1.044 0 0 0 13.227 9H8.08a1.083 1.083 0 0 1-1.081-1.08V2.772c0-.315-.14-.611-.385-.812a1.015 1.015 0 0 0-.84-.212 7.248 7.248 0 0 0-4.587 3.1C.122 6.46-.243 8.413.159 10.344c.567 2.72 2.775 4.927 5.495 5.494.513.107 1.027.16 1.537.16a7.155 7.155 0 0 0 3.96-1.186 7.25 7.25 0 0 0 3.098-4.586.999.999 0 0 0-.211-.84Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );

    case 'users-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M13.811 5.525a2.405 2.405 0 0 1-1.555 1.546 2.47 2.47 0 0 1-2.862-1.028.226.226 0 0 1 0-.23c.33-.592.52-1.274.52-2.003 0-.253-.023-.5-.067-.742a.226.226 0 0 1 .071-.214c.423-.359.97-.568 1.557-.568a2.464 2.464 0 0 1 2.336 3.24Zm-1.156 2.688h-1.508a.224.224 0 0 0-.229.229c0 .06.023.122.069.16l.022.023c1.067 1.028 1.562 2.499 1.562 3.962 0 .282-.015.556-.06.807a.398.398 0 0 0-.01.093c0 .13.1.227.223.227h1.112c1.394 0 2.164-.761 2.164-2.148 0-1.547-.876-3.353-3.345-3.353ZM5.722.762a3.047 3.047 0 1 0-.002 6.094A3.047 3.047 0 0 0 5.722.762Zm1.516 7.619H4.19C1.097 8.381 0 10.644 0 12.587c0 1.737.922 2.651 2.667 2.651h6.095c1.745 0 2.667-.914 2.667-2.651 0-1.943-1.098-4.206-4.19-4.206Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'life-ring-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M5.104 5.944c-.016-.008-.024-.024-.04-.032l-3.12-3.128A7.923 7.923 0 0 0 0 8c0 1.992.728 3.816 1.944 5.216l3.12-3.128c.008-.016.024-.024.04-.032A3.574 3.574 0 0 1 4.448 8c0-.76.248-1.48.656-2.056ZM8 0a7.936 7.936 0 0 0-5.208 1.936l3.12 3.128c.016.016.024.032.032.048A3.505 3.505 0 0 1 8 4.448a3.6 3.6 0 0 1 2.064.656c.008-.016.016-.024.032-.04l3.12-3.128A7.926 7.926 0 0 0 8 0Zm6.064 2.784-3.12 3.128c-.016.008-.024.024-.04.032.408.576.656 1.296.656 2.056s-.248 1.48-.656 2.056a.14.14 0 0 1 .04.032l3.12 3.128A7.957 7.957 0 0 0 16 8a7.957 7.957 0 0 0-1.936-5.216Zm-4 8.112A3.6 3.6 0 0 1 8 11.552c-.768 0-1.48-.248-2.056-.664-.008.016-.016.032-.032.048l-3.12 3.128A7.936 7.936 0 0 0 8 16c2 0 3.824-.728 5.216-1.936l-3.12-3.128c-.016-.016-.024-.024-.032-.04Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );

    case 'sign-direction-right-icon':
      return (
        <>
          <path
            fill={fill}
            d='M13.889 6.119 11.547 8.46c-.23.23-.544.36-.87.36H2.514C1.505 8.82 1 8.317 1 7.307V3.77c0-1.01.505-1.515 1.515-1.515h3.613V.616A.62.62 0 0 1 6.744 0a.62.62 0 0 1 .615.615v1.641h3.317c.327 0 .64.13.87.36l2.343 2.342c.32.32.32.84 0 1.16Zm-4.683 8.65H7.36v-4.718H6.129v4.718H4.283a.616.616 0 0 0 0 1.231h4.923a.616.616 0 0 0 0-1.23Z'
          />
        </>
      );

    case 'user-circle-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm.006 4a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8ZM8 14.8a6.765 6.765 0 0 1-4.592-1.792c.352-1.104 1.264-2.152 3.224-2.152h2.736c1.952 0 2.864 1.056 3.224 2.152A6.765 6.765 0 0 1 8 14.8Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );

    case 'home-dash-user-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              fillRule='evenodd'
              d='M12.491 16H3.508a2.222 2.222 0 0 1-2.186-1.825L.03 7.08a1.778 1.778 0 0 1 .62-1.691L6.587.506a2.223 2.223 0 0 1 2.824 0l5.94 4.883c.498.41.735 1.057.62 1.691l-1.294 7.096A2.223 2.223 0 0 1 12.49 16ZM8 8.71A1.913 1.913 0 0 0 9.91 6.8 1.913 1.913 0 0 0 8 4.887 1.913 1.913 0 0 0 6.088 6.8c0 1.055.857 1.912 1.912 1.912Zm3.11 3.465v.269c0 .245-.198.444-.444.444H5.333a.445.445 0 0 1-.445-.444v-.27c0-1.19.872-2.397 2.54-2.397H8.57c1.67 0 2.542 1.206 2.542 2.398Z'
              clipRule='evenodd'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'exclamation-icon':
      return (
        <>
          <path
            fill={fill}
            d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm-.6 4.4a.6.6 0 0 1 1.2 0v3.657a.6.6 0 0 1-1.2 0V4.4Zm.616 7.2a.804.804 0 0 1-.804-.8c0-.442.354-.8.796-.8h.008a.8.8 0 1 1 0 1.6Z'
          />
        </>
      );
    case 'building-icon':
      return (
        <>
          <path
            fill={fill}
            d='M15.2 14.3H14V2.9c0-1.6-.8-2.4-2.4-2.4H4.4C2.8.5 2 1.3 2 2.9v11.4H.8a.6.6 0 0 0 0 1.2h14.4a.6.6 0 0 0 0-1.2ZM9.6 3.1h.8a.6.6 0 0 1 0 1.2h-.8a.6.6 0 0 1 0-1.2Zm0 2.4h.8a.6.6 0 0 1 0 1.2h-.8a.6.6 0 0 1 0-1.2Zm0 2.4h.8a.6.6 0 0 1 0 1.2h-.8a.6.6 0 0 1 0-1.2Zm-4-4.8h.8a.6.6 0 0 1 0 1.2h-.8a.6.6 0 0 1 0-1.2Zm0 2.4h.8a.6.6 0 0 1 0 1.2h-.8a.6.6 0 0 1 0-1.2Zm0 2.4h.8a.6.6 0 0 1 0 1.2h-.8a.6.6 0 0 1 0-1.2Zm.6 4.2c0-.8.4-1.2 1.2-1.2h1.2c.8 0 1.2.4 1.2 1.2v2.2H6.2v-2.2Z'
          />
        </>
      );
    case 'clock-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm2.824 10.824a.599.599 0 0 1-.848 0l-2.4-2.4A.6.6 0 0 1 7.4 8V4a.6.6 0 0 1 1.2 0v3.751l2.224 2.224a.6.6 0 0 1 0 .849Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'setting-icon':
      return (
        <>
          <path
            fill={fill}
            d='M15.849 10.311A2.672 2.672 0 0 1 14.515 8c0-.951.507-1.831 1.334-2.311.142-.089.195-.267.107-.409L14.47 2.72a.285.285 0 0 0-.249-.151.3.3 0 0 0-.15.044 2.722 2.722 0 0 1-1.334.356c-.471 0-.934-.125-1.351-.365A2.658 2.658 0 0 1 10.053.302.298.298 0 0 0 9.76 0H6.24a.298.298 0 0 0-.293.302c0 .951-.507 1.822-1.334 2.302-.417.24-.88.365-1.35.365-.463 0-.925-.125-1.334-.356a.284.284 0 0 0-.4.107L.036 5.28A.282.282 0 0 0 0 5.422c0 .107.053.205.151.267A2.658 2.658 0 0 1 1.484 7.99c0 .96-.506 1.84-1.324 2.32H.151c-.142.089-.195.267-.107.409l1.485 2.56a.285.285 0 0 0 .249.151.3.3 0 0 0 .15-.044 2.704 2.704 0 0 1 2.685.009 2.668 2.668 0 0 1 1.325 2.302.3.3 0 0 0 .302.302h3.52c.16 0 .293-.133.293-.302 0-.951.507-1.822 1.334-2.302.417-.24.88-.365 1.35-.365.463 0 .925.125 1.334.356.142.089.32.035.4-.107l1.493-2.56a.281.281 0 0 0 .036-.142.313.313 0 0 0-.151-.267ZM8 10.667A2.663 2.663 0 0 1 5.333 8 2.663 2.663 0 0 1 8 5.333 2.663 2.663 0 0 1 10.667 8 2.663 2.663 0 0 1 8 10.667Z'
          />
        </>
      );
    case 'comment-text-icon':
      return (
        <>
          <path
            fill={fill}
            d='M8 .445c-4.418 0-8 2.666-8 7.112 0 1.884.65 3.458 1.734 4.632-.134.853-.614 1.83-1.583 2.613-.293.249-.124.738.258.747 1.262.044 3.209-.125 4.4-1.396A9.764 9.764 0 0 0 8 14.668c4.418 0 8-2.667 8-7.111C16 3.11 12.418.445 8 .445ZM8.89 10H4.444a.667.667 0 0 1 0-1.333h4.444a.667.667 0 0 1 0 1.333Zm2.666-3.555H4.445a.667.667 0 0 1 0-1.334h7.11a.667.667 0 0 1 0 1.334Z'
          />
        </>
      );
    case 'paper-clip-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M6.65 16c-1.582 0-3.055-.604-4.15-1.701-2.306-2.313-2.271-6.11.078-8.467L7.16 1.237A4.178 4.178 0 0 1 10.14 0a4.18 4.18 0 0 1 2.98 1.237 4.234 4.234 0 0 1 0 5.97l-4.605 4.616c-.947.95-2.599.95-3.546 0a2.518 2.518 0 0 1 0-3.55l4.045-4.055a.8.8 0 1 1 1.132 1.13L6.102 9.404a.916.916 0 0 0 0 1.29.926.926 0 0 0 1.28 0l4.605-4.617a2.632 2.632 0 0 0 0-3.71c-.987-.99-2.706-.99-3.693 0L3.71 6.962c-1.698 1.703-1.733 4.546-.077 6.206A4.223 4.223 0 0 0 6.651 14.4c1.184 0 2.34-.476 3.167-1.308L13.84 9.06a.8.8 0 0 1 1.133 1.13l-4.022 4.033A6.114 6.114 0 0 1 6.651 16Z'
          />
        </>
      );
    case 'true-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              fillRule='evenodd'
              d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM6.667 9.057l4.195-4.195a.667.667 0 0 1 .943.943L7.138 10.47a.667.667 0 0 1-.943 0l-2-2a.667.667 0 0 1 .943-.942l1.529 1.528Z'
              clipRule='evenodd'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'envelope-icon':
      return (
        <>
          <path
            fill={fill}
            d='M13.333 1.333H2.667C.889 1.333 0 2.224 0 4v8c0 1.778.889 2.667 2.667 2.667h10.666c1.778 0 2.667-.89 2.667-2.667V4c0-1.778-.889-2.667-2.667-2.667Zm-.052 4.095L8.915 8.603a1.554 1.554 0 0 1-1.83 0L2.72 5.429a.667.667 0 1 1 .785-1.079L7.87 7.526a.221.221 0 0 0 .26 0l4.367-3.176a.666.666 0 1 1 .784 1.079Z'
          />
        </>
      );
    case 'phone-icon':
      return (
        <>
          <path
            fill={fill}
            d='m13 9.932 2.35 1.401c.485.29.735.854.624 1.408-.454 2.275-2.739 3.733-4.976 3.118A15.503 15.503 0 0 1 .141 5.01C-.474 2.77.982.484 3.258.029l.015-.002a1.335 1.335 0 0 1 1.41.628l1.39 2.346c.494.835.249 1.91-.56 2.446l-1.476.982a10.313 10.313 0 0 0 5.521 5.534l.991-1.48a1.825 1.825 0 0 1 2.45-.55Z'
          />
        </>
      );
    case 'calender-icon':
      return (
        <>
          <path
            fill={fill}
            d='M15.579 6.779v6.695c0 1.684-.842 2.526-2.526 2.526H2.947c-1.684 0-2.526-.842-2.526-2.526V6.779c0-.14.113-.253.253-.253h14.652c.14 0 .253.113.253.253Zm-2.526-4.674H12V.842a.636.636 0 0 0-.632-.632.636.636 0 0 0-.631.632v1.263H5.263V.842A.636.636 0 0 0 4.632.21.636.636 0 0 0 4 .842v1.263H2.947c-1.684 0-2.526.842-2.526 2.526v.38c0 .14.113.252.253.252h14.652c.14 0 .253-.113.253-.253v-.378c0-1.685-.842-2.527-2.526-2.527Z'
          />
        </>
      );
    case 'trash-icon':
      return (
        <>
          <path
            fill={fill}
            d='M15.778 2.667a.667.667 0 0 1-.667.666H.89A.667.667 0 0 1 .889 2h3.746c.082-.162.146-.345.215-.55l.18-.539C5.21.367 5.72 0 6.293 0h3.412c.574 0 1.083.367 1.265.911l.18.54c.068.204.132.387.214.549h3.746c.368 0 .667.299.667.667ZM13.83 4.222c.154 0 .277.13.266.285l-.595 9.004C13.404 14.916 12.667 16 10.835 16h-5.67c-1.832 0-2.57-1.084-2.667-2.489l-.595-9.004a.267.267 0 0 1 .266-.285H13.83ZM6.89 7.112a.672.672 0 0 0-.667-.668.672.672 0 0 0-.667.667v4.445c0 .364.303.666.667.666a.671.671 0 0 0 .667-.666V7.11Zm3.555 0a.672.672 0 0 0-.666-.668.672.672 0 0 0-.667.667v4.445c0 .364.302.666.667.666a.671.671 0 0 0 .666-.666V7.11Z'
          />
        </>
      );
    case 'edit-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.79 15.79H3.367C1.332 15.79.21 14.667.21 12.631V4.21c0-2.036 1.122-3.157 3.158-3.157h2.527a.632.632 0 0 1 0 1.263H3.368c-1.328 0-1.894.566-1.894 1.894v8.422c0 1.328.566 1.894 1.894 1.894h8.421c1.328 0 1.895-.566 1.895-1.894v-2.527a.632.632 0 0 1 1.263 0v2.527c0 2.036-1.121 3.157-3.158 3.157Zm3.856-14.08L14.29.353a1.222 1.222 0 0 0-1.726.008l-1.137 1.145 3.066 3.066 1.145-1.137c.48-.48.48-1.247.008-1.727Zm-5.111.69L5.053 7.907v3.04h3.04L13.6 5.465 10.535 2.4Z'
          />
        </>
      );
    case 'document-icon':
      return (
        <>
          <path
            fill={fill}
            d='M16 7.556v6a1.112 1.112 0 0 1-2.222 0V6.222h.889c.736 0 1.333.598 1.333 1.334ZM14.222 16H2.667C.889 16 0 15.111 0 13.333V2.667C0 .889.889 0 2.667 0h7.11c1.779 0 2.667.889 2.667 2.667v11.555c0 .982.797 1.778 1.778 1.778ZM2.89 4.444c0 .368.299.667.667.667h2.666a.667.667 0 0 0 0-1.333H3.556a.667.667 0 0 0-.667.666Zm6.667 7.112a.667.667 0 0 0-.667-.667H3.556a.667.667 0 0 0 0 1.333h5.333a.667.667 0 0 0 .667-.666Zm0-3.556a.667.667 0 0 0-.667-.667H3.556a.667.667 0 0 0 0 1.334h5.333A.667.667 0 0 0 9.556 8Z'
          />
        </>
      );
    case 'eye-icon':
      return (
        <>
          <path
            fill={fill}
            d='M10.444 8A2.446 2.446 0 0 1 8 10.444 2.446 2.446 0 0 1 5.556 8c0-.31.064-.604.17-.878.172.137.38.23.617.23a1.01 1.01 0 0 0 1.01-1.009.989.989 0 0 0-.231-.618c.274-.105.568-.17.878-.17A2.446 2.446 0 0 1 10.444 8Zm5.193 1.313c-1.09 1.826-3.54 4.91-7.637 4.91-4.097 0-6.547-3.084-7.637-4.91a2.558 2.558 0 0 1 0-2.626c1.09-1.826 3.54-4.91 7.637-4.91 4.097 0 6.547 3.084 7.637 4.91a2.558 2.558 0 0 1 0 2.626ZM11.777 8A3.782 3.782 0 0 0 8 4.222 3.782 3.782 0 0 0 4.222 8 3.782 3.782 0 0 0 8 11.778 3.782 3.782 0 0 0 11.778 8Z'
          />
        </>
      );
    case 'brief-case-icon':
      return (
        <>
          <path
            fill={fill}
            d='M13.053 3.053H12V1.79A1.48 1.48 0 0 0 10.526.316H5.474C4.657.316 4 .98 4 1.79v1.263H2.947c-1.684 0-2.526.842-2.526 2.526v.808c0 .784.463 1.474 1.188 1.752 1.162.463 2.366.817 3.57 1.07.093.016.177-.051.227-.127C6.013 8.172 6.99 7.625 8 7.625c1.019 0 1.987.548 2.602 1.457.05.076.135.143.228.127 1.204-.253 2.4-.607 3.562-1.061a1.876 1.876 0 0 0 1.187-1.76v-.809c0-1.684-.842-2.526-2.526-2.526Zm-7.79 0V1.79c0-.118.093-.21.21-.21h5.053c.118 0 .21.092.21.21v1.263H5.264Zm5.82 7.394a1.649 1.649 0 0 1-.287.025c-.489 0-.952-.253-1.246-.69-.371-.557-.952-.893-1.55-.893-.59 0-1.17.336-1.541.892-.354.522-.952.783-1.533.665a22.388 22.388 0 0 1-3.78-1.128 2.687 2.687 0 0 1-.725-.413v4.253c0 1.684.842 2.526 2.526 2.526h10.106c1.684 0 2.526-.842 2.526-2.526V8.914a2.903 2.903 0 0 1-.724.404c-1.23.488-2.501.867-3.773 1.129Zm-3.081 1.027a.844.844 0 0 1-.844-.842c0-.465.373-.842.837-.842h.007a.842.842 0 0 1 0 1.684Z'
          />
        </>
      );
    case 'bell-icon':
      return (
        <>
          <path
            fill={fill}
            d='M9.731 14.2a.4.4 0 0 1-.001.402A1.986 1.986 0 0 1 8 15.6a1.986 1.986 0 0 1-1.73-.998.4.4 0 0 1 .346-.602h2.768c.143 0 .275.077.347.2Zm4.982-1.65c-.015-.018-1.517-1.925-1.517-4.15V5.596A5.202 5.202 0 0 0 8 .4a5.202 5.202 0 0 0-5.196 5.196V8.4c0 2.225-1.5 4.131-1.517 4.15a.4.4 0 0 0 .312.65h12.8a.4.4 0 0 0 .314-.65Z'
          />
        </>
      );
    case 'home-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M13.333 16h-2.845a.266.266 0 0 1-.266-.266V12a2.222 2.222 0 1 0-4.445 0v3.734c0 .147-.119.266-.266.266H2.667C.889 16 0 15.111 0 13.334V7.69c0-1.776.465-2.049 1.271-2.724L6.572.52a2.223 2.223 0 0 1 2.856 0l5.301 4.446C15.534 5.64 16 5.914 16 7.69v5.644C16 15.11 15.11 16 13.333 16Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'shopping-bag-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M5.684 5.053H4.421V3.789A3.587 3.587 0 0 1 8 .21a3.587 3.587 0 0 1 3.579 3.58v1.263h-1.263V3.789A2.314 2.314 0 0 0 8 1.474a2.314 2.314 0 0 0-2.316 2.315v1.264Zm7.79 0h-1.895v2.526a.636.636 0 0 1-.632.631.636.636 0 0 1-.631-.631V5.053H5.684v2.526a.636.636 0 0 1-.631.631.636.636 0 0 1-.632-.631V5.053H2.526c-.699 0-1.263.564-1.263 1.263v7.158c0 1.684.842 2.526 2.527 2.526h8.42c1.685 0 2.527-.842 2.527-2.526V6.316c0-.7-.564-1.263-1.263-1.263Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'shopping-cart-icon':
      return (
        <>
          <path
            fill={fill}
            d='M5.617 16a1.004 1.004 0 0 1-1.004-1c0-.551.444-1 .996-1h.008a1 1 0 0 1 0 2Zm7.4-1a1 1 0 0 0-1-1h-.008a.997.997 0 0 0-.996 1c0 .553.452 1 1.004 1a1 1 0 0 0 1-1ZM8.8 9.2a.604.604 0 0 1-.6-.6c0-.327.272-.6.6-.6h5.654a.24.24 0 0 0 .237-.2l.476-2.912A1.597 1.597 0 0 0 13.6 3H3.953l-.167-1.109A2.184 2.184 0 0 0 1.607 0H1.4a.6.6 0 0 0 0 1.2h.2c.502 0 .928.369 1 .866l1.2 8.358A1.595 1.595 0 0 0 5.383 11.8H12c1.68 0 2.152-.832 2.36-1.968l.057-.348s.052-.284-.218-.284H8.801Z'
          />
        </>
      );
    case 'star-icon':
      return (
        <>
          <path
            fill={fill}
            d='m8.855.975 1.727 3.481a.89.89 0 0 0 .67.486l3.986.576a.888.888 0 0 1 .493 1.515L12.85 9.83a.887.887 0 0 0-.258.787l.659 3.826a.952.952 0 0 1-1.38 1.003l-3.457-1.81a.89.89 0 0 0-.827 0l-3.454 1.808c-.7.366-1.517-.227-1.383-1.004l.66-3.823a.887.887 0 0 0-.258-.787L.273 7.033a.887.887 0 0 1 .493-1.515l3.984-.576a.892.892 0 0 0 .672-.486L7.148.975c.347-.707 1.357-.707 1.707 0Z'
          />
        </>
      );
    case 'globe-icon':
      return (
        <>
          <path
            fill={fill}
            d='M3.864 8.6c.12 2.464.952 4.976 2.4 7.208A8.005 8.005 0 0 1 .024 8.6h3.84Zm2.4-8.408A8.005 8.005 0 0 0 .024 7.4h3.84c.12-2.464.952-4.976 2.4-7.208ZM8.16 0h-.32L7.6.344C6.08 2.504 5.192 4.984 5.064 7.4h5.872C10.808 4.984 9.92 2.504 8.4.344L8.16 0ZM5.064 8.6c.128 2.416 1.016 4.896 2.536 7.056l.24.344h.32l.24-.344c1.52-2.16 2.408-4.64 2.536-7.056H5.064Zm7.072 0c-.12 2.464-.952 4.976-2.4 7.208a8.005 8.005 0 0 0 6.24-7.208h-3.84Zm3.84-1.2A8.005 8.005 0 0 0 9.736.192c1.448 2.232 2.28 4.744 2.4 7.208h3.84Z'
          />
        </>
      );
    case 'folder-icon':
      return (
        <>
          <path
            fill={fill}
            d='M16 6.222v6.222c0 1.778-.889 2.667-2.667 2.667H2.667C.889 15.111 0 14.222 0 12.444V3.556C0 1.778.889.889 2.667.889h3.555L8.89 3.556h4.444c1.778 0 2.667.888 2.667 2.666Z'
          />
        </>
      );
    case 'flag-icon':
      return (
        <>
          <path
            fill={fill}
            d='m10.947 4.632 3.369 4.631H3.158v5.861a.636.636 0 0 1-.632.632.636.636 0 0 1-.631-.632V2.526C1.895.842 2.737 0 4.42 0h9.895l-3.369 4.632Z'
          />
        </>
      );
    case 'location-pin-icon':
      return (
        <>
          <path
            fill={fill}
            d='M8 .4C4.25.4 1.2 3.45 1.2 7.2c0 3.986 3.703 6.433 6.154 8.051l.424.282a.4.4 0 0 0 .443 0l.424-.282c2.45-1.618 6.153-4.065 6.153-8.051A6.805 6.805 0 0 0 8 .4Zm0 8.8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z'
          />
        </>
      );
    case 'grid-square-circle-icon':
      return (
        <>
          <path
            fill={fill}
            d='M10 13a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm4.5-13h-3c-1 0-1.5.5-1.5 1.5v3c0 1 .5 1.5 1.5 1.5h3c1 0 1.5-.5 1.5-1.5v-3c0-1-.5-1.5-1.5-1.5Zm-10 0h-3C.5 0 0 .5 0 1.5v3C0 5.5.5 6 1.5 6h3C5.5 6 6 5.5 6 4.5v-3C6 .5 5.5 0 4.5 0Zm0 10h-3c-1 0-1.5.5-1.5 1.5v3c0 1 .5 1.5 1.5 1.5h3c1 0 1.5-.5 1.5-1.5v-3c0-1-.5-1.5-1.5-1.5Z'
          />
        </>
      );
    case 'laptop-icon':
      return (
        <>
          <path
            fill={fill}
            d='M15.111 4v6.4c0 .147-.119.267-.267.267H1.156a.266.266 0 0 1-.267-.267V4c0-1.778.889-2.667 2.667-2.667h8.888c1.778 0 2.667.89 2.667 2.667Zm.622 8H.267a.266.266 0 0 0-.267.267v.622c0 1.185.593 1.778 1.778 1.778h12.444c1.185 0 1.778-.593 1.778-1.778v-.622a.266.266 0 0 0-.267-.267Z'
          />
        </>
      );
    case 'shield-icon':
      return (
        <>
          <path
            fill={fill}
            d='M15.2 7.111c0 5.334-4.534 8-7.2 8.889C5.334 15.111.8 12.445.8 7.111V2.4C4.8 1.6 6.223.889 8.015 0 9.777.889 11.2 1.6 15.2 2.4v4.711Z'
          />
        </>
      );
  }
};

const LabelSvgIcon = ({
  name = '',
  style = {},
  fill = '',
  viewBox = '',
  height = '24',
  width = '24',
  className = '',
  strokeWidth = 1.5,
  bgfill = 'none',
  stroke = '',
  stopColor = '',
  iconprimary = colors.icon,
}) => (
  <svg
    stroke={stroke}
    width={width}
    style={style}
    height={height}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    {getPath(name, {
      fill,
      strokeWidth,
      bgfill,
      stroke,
      stopColor,
      iconprimary,
    })}
  </svg>
);

export default LabelSvgIcon;

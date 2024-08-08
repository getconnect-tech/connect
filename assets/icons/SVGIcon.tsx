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
    case 'logo-icon':
      return (
        <>
          <rect width={20} height={20} y={0.5} fill='#282828' rx={10} />
          <path
            fill='#fff'
            d='m11.023 7.264-.284-.018c-.665 0-1.199.23-1.602.688-.392.447-.588 1.205-.588 2.275 0 1.058.149 1.864.445 2.416.309.553.896.83 1.763.83.403 0 1.257-.271 2.562-.812.297.411.457.84.481 1.287-.653.4-1.293.712-1.922.935-.617.223-1.056.335-1.317.335-1.46 0-2.551-.394-3.275-1.182-.724-.8-1.086-1.916-1.086-3.35C6.2 7.423 7.677 5.8 10.632 5.8c.51 0 1.032.065 1.566.194.546.118.973.27 1.282.459-.036 1.175-.167 2.028-.392 2.557-.391.094-.943.14-1.655.14l-.41-1.886Z'
          />
        </>
      );
    case 'sidebar-icon':
      return (
        <>
          <path
            fill='#000'
            fillOpacity={0.5}
            fillRule='evenodd'
            d='M19 7H9a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3ZM8 10a1 1 0 0 1 1-1h2v10H9a1 1 0 0 1-1-1v-8Zm5 9h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6v10Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'started-icon':
      return (
        <>
          <path
            fill={fill}
            d='M10.416 4.589 8.66 6.345a.924.924 0 0 1-.653.27H1.886C1.128 6.615.75 6.237.75 5.48V2.83c0-.758.378-1.137 1.136-1.137h2.71V.462c0-.253.21-.462.462-.462s.461.21.461.462v1.23h2.488c.245 0 .48.098.653.27l1.756 1.757c.241.24.241.63 0 .87Zm-3.512 6.488H5.52V7.538h-.923v3.539H3.212a.462.462 0 0 0 0 .923h3.692a.462.462 0 0 0 0-.923Z'
          />
        </>
      );
    case 'inbox-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M10 0H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm0 7H8.5a.5.5 0 0 0-.5.5V9H4V7.5a.5.5 0 0 0-.5-.5H2V2h8v5Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'unassign-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.005 3a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM6 11.1a5.074 5.074 0 0 1-3.444-1.344c.264-.828.948-1.614 2.418-1.614h2.052c1.464 0 2.148.792 2.418 1.614A5.074 5.074 0 0 1 6 11.1Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'all-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M10.358 4.323c-.174.545-.62.988-1.166 1.159a1.852 1.852 0 0 1-2.146-.77.17.17 0 0 1 0-.174c.248-.443.389-.955.389-1.502 0-.19-.017-.375-.05-.556a.17.17 0 0 1 .054-.16 1.8 1.8 0 0 1 1.167-.427 1.848 1.848 0 0 1 1.752 2.43Zm-.867 2.016H8.36a.168.168 0 0 0-.171.171c0 .046.017.091.051.12l.017.017c.8.772 1.172 1.874 1.172 2.972 0 .211-.012.417-.046.605a.298.298 0 0 0-.008.07c0 .097.076.17.168.17h.834c1.046 0 1.623-.571 1.623-1.611 0-1.16-.657-2.514-2.509-2.514ZM4.291.75a2.285 2.285 0 1 0 0 4.57 2.285 2.285 0 0 0 0-4.57ZM5.43 6.464H3.143C.823 6.464 0 8.161 0 9.62c0 1.302.691 1.988 2 1.988h4.571c1.309 0 2-.686 2-1.988 0-1.458-.822-3.155-3.142-3.155Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'contact-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              fillRule='evenodd'
              d='M9.368 12H2.631a1.666 1.666 0 0 1-1.64-1.368L.022 5.31a1.333 1.333 0 0 1 .465-1.268L4.941.38a1.667 1.667 0 0 1 2.118 0l4.455 3.662c.374.307.551.792.464 1.268l-.97 5.322A1.667 1.667 0 0 1 9.368 12ZM6 6.533a1.435 1.435 0 0 0 0-2.867 1.435 1.435 0 0 0 0 2.867ZM8.333 9.13v.202c0 .184-.15.333-.333.333H4a.333.333 0 0 1-.334-.333V9.13c0-.893.654-1.798 1.906-1.798h.855c1.252 0 1.906.904 1.906 1.798Z'
              clipRule='evenodd'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'insight-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M11.802 5.234a.812.812 0 0 1-.613.28H7.292a.806.806 0 0 1-.805-.806V.81a.811.811 0 0 1 .916-.803 5.41 5.41 0 0 1 4.59 4.59.801.801 0 0 1-.191.636ZM10.528 7.04a.783.783 0 0 0-.608-.29H6.06a.812.812 0 0 1-.81-.81V2.08a.784.784 0 0 0-.29-.61.761.761 0 0 0-.63-.158A5.436 5.436 0 0 0 .89 3.636 5.422 5.422 0 0 0 .12 7.76c.424 2.04 2.08 3.695 4.12 4.12.385.08.771.12 1.153.12a5.366 5.366 0 0 0 2.97-.889 5.438 5.438 0 0 0 2.324-3.44.749.749 0 0 0-.159-.63Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'bug-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M12 11.21a.462.462 0 0 1-.924 0c0-.763-.621-1.384-1.384-1.384h-.423A3.687 3.687 0 0 1 6.68 11.76a.189.189 0 0 1-.218-.186v-4.67A.465.465 0 0 0 6 6.441a.465.465 0 0 0-.461.461v4.671a.189.189 0 0 1-.219.186 3.687 3.687 0 0 1-2.588-1.934h-.424c-.763 0-1.385.621-1.385 1.385a.462.462 0 0 1-.923 0 2.31 2.31 0 0 1 2.308-2.308h.088a3.683 3.683 0 0 1-.088-.769v-.769H.462a.462.462 0 0 1 0-.923h1.846V5.057c0-.056.008-.104.01-.158A2.29 2.29 0 0 1 .22 3.323l-.196-.58A.462.462 0 0 1 .9 2.448l.197.584c.182.56.699.938 1.287.948l.162.002c.281-.512.816-.771 1.609-.771h3.692c.793 0 1.327.26 1.609.77l.162-.001a1.371 1.371 0 0 0 1.285-.942l.198-.59a.462.462 0 0 1 .875.295l-.196.585a2.29 2.29 0 0 1-2.097 1.57c.002.055.01.103.01.16v1.384h1.847a.462.462 0 0 1 0 .923H9.692v.77c0 .264-.035.52-.088.768h.088a2.31 2.31 0 0 1 2.307 2.308ZM4.42 2.289h3.16c.12 0 .216-.114.18-.229A1.84 1.84 0 0 0 6 .75a1.84 1.84 0 0 0-1.761 1.31c-.035.114.061.228.18.228Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'question-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.012 9.3a.603.603 0 0 1-.603-.6c0-.331.266-.6.597-.6h.006a.6.6 0 1 1 0 1.2Zm.95-2.983c-.439.294-.52.458-.535.5a.45.45 0 1 1-.854-.286c.109-.324.39-.63.887-.962.613-.41.534-.86.508-1.008a1 1 0 0 0-.786-.795.97.97 0 0 0-.81.212 1 1 0 0 0-.357.768.45.45 0 0 1-.9 0c0-.565.248-1.096.679-1.457.427-.358.99-.507 1.544-.409.76.134 1.384.763 1.517 1.527.132.757-.186 1.436-.893 1.91Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'feedback-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0ZM4.2 8.37c0 .1-.08.18-.18.18h-.396a.474.474 0 0 1-.474-.474v-2.22c0-.261.213-.474.474-.474h.396c.1 0 .18.08.18.18V8.37ZM8.771 6l-.636 1.902c-.126.384-.264.648-.9.648H4.98a.18.18 0 0 1-.18-.18V5.213c0-.02.003-.038.01-.057l.65-1.982a.504.504 0 0 1 .75-.24c.264.174.42.474.42.792v1.026h1.242c.948 0 1.104.636.9 1.248Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'support-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M3.828 4.458c-.012-.006-.018-.018-.03-.024l-2.34-2.346A5.942 5.942 0 0 0 0 6c0 1.494.546 2.862 1.458 3.912l2.34-2.346c.006-.012.018-.018.03-.024A2.68 2.68 0 0 1 3.336 6c0-.57.186-1.11.492-1.542ZM6 0a5.952 5.952 0 0 0-3.906 1.452l2.34 2.346c.012.012.018.024.024.036A2.629 2.629 0 0 1 6 3.336a2.7 2.7 0 0 1 1.548.492.105.105 0 0 1 .024-.03l2.34-2.346A5.944 5.944 0 0 0 6 0Zm4.548 2.088-2.34 2.346c-.012.006-.018.018-.03.024.306.432.492.972.492 1.542 0 .57-.186 1.11-.492 1.542a.105.105 0 0 1 .03.024l2.34 2.346A5.968 5.968 0 0 0 12 6a5.968 5.968 0 0 0-1.452-3.912Zm-3 6.084A2.7 2.7 0 0 1 6 8.664c-.576 0-1.11-.186-1.542-.498-.006.012-.012.024-.024.036l-2.34 2.346A5.952 5.952 0 0 0 6 12c1.5 0 2.868-.546 3.912-1.452l-2.34-2.346a.105.105 0 0 1-.024-.03Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'secondary-logo':
      return (
        <>
          <rect width={60} height={60} fill='#282828' rx={30} />
          <path
            fill='#fff'
            d='m33.07 19.991-.855-.053c-1.993 0-3.595.688-4.805 2.064-1.175 1.34-1.762 3.615-1.762 6.825 0 3.174.445 5.59 1.335 7.248.925 1.658 2.687 2.487 5.286 2.487 1.21 0 3.773-.811 7.689-2.434.89 1.234 1.37 2.522 1.442 3.862-1.958 1.2-3.88 2.134-5.767 2.804-1.851.67-3.168 1.006-3.951 1.006-4.379 0-7.654-1.182-9.825-3.545-2.172-2.399-3.257-5.75-3.257-10.053 0-9.735 4.431-14.602 13.295-14.602 1.53 0 3.097.194 4.699.582 1.637.352 2.919.81 3.844 1.375-.106 3.527-.498 6.085-1.174 7.672-1.175.282-2.83.423-4.966.423l-1.228-5.661Z'
          />
        </>
      );
    case 'up-arrow-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M9.746 8.636 5.989 5.1 2.233 8.636a.905.905 0 0 1-.616.231.903.903 0 0 1-.61-.241.8.8 0 0 1-.257-.575.798.798 0 0 1 .246-.58L5.37 3.354a.904.904 0 0 1 .62-.241c.231 0 .454.086.618.24l4.375 4.118c.083.076.15.167.196.268a.781.781 0 0 1-.185.907.88.88 0 0 1-.288.18.923.923 0 0 1-.96-.19Z'
          />
        </>
      );
    case 'down-arrow-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M9.746 3.364 5.989 6.9 2.233 3.364a.905.905 0 0 0-.616-.231.903.903 0 0 0-.61.241.8.8 0 0 0-.257.575.798.798 0 0 0 .246.58L5.37 8.646a.904.904 0 0 0 .618.241.904.904 0 0 0 .619-.24l4.375-4.118a.824.824 0 0 0 .196-.268.783.783 0 0 0-.185-.907.88.88 0 0 0-.288-.18.923.923 0 0 0-.96.19Z'
          />
        </>
      );
    case 'three-dot-icon':
      return (
        <>
          <path
            fill={fill}
            d='M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM14 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'
          />
        </>
      );
    case 'back-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.514 12.994 6.801 7.986l4.713-5.009c.2-.22.311-.515.309-.82a1.204 1.204 0 0 0-.322-.815A1.067 1.067 0 0 0 10.734 1a1.065 1.065 0 0 0-.772.327l-5.49 5.834a1.205 1.205 0 0 0-.322.825c0 .309.116.606.322.824l5.49 5.834c.101.111.222.2.356.261a1.044 1.044 0 0 0 1.21-.247c.103-.11.185-.24.24-.383a1.23 1.23 0 0 0-.008-.902 1.17 1.17 0 0 0-.246-.379Z'
          />
        </>
      );
    case 'attach-icon':
      return (
        <>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.98778 12.0001C3.80098 12.0001 2.69638 11.5471 1.87558 10.7239C0.145776 8.98934 0.171691 6.14115 1.93329 4.37415L5.37011 0.92774C5.96711 0.32894 6.76022 -0.000457764 7.60502 -0.000457764C8.44982 -0.000457764 9.24248 0.32894 9.84008 0.92774C11.0713 2.16254 11.0713 4.17074 9.84008 5.40494L6.38642 8.86754C5.67602 9.57914 4.4371 9.58034 3.7267 8.86754C2.9947 8.13314 2.9947 6.93915 3.7267 6.20535L6.76024 3.16335C6.99484 2.92875 7.37408 2.92814 7.60868 3.16214C7.84388 3.39614 7.84385 3.77594 7.60985 4.01054L4.57631 7.05254C4.31051 7.31954 4.31051 7.75335 4.57631 8.02035C4.83371 8.27775 5.28001 8.27715 5.53681 8.02035L8.99047 4.55775C9.75547 3.79035 9.75547 2.54235 8.99047 1.77495C8.25007 1.03275 6.9607 1.03275 6.2203 1.77495L2.78349 5.22134C1.50969 6.49874 1.48377 8.63054 2.72577 9.87614C3.31917 10.4713 4.12317 10.7995 4.98837 10.7995C5.87637 10.7995 6.74291 10.4425 7.36391 9.81914L10.38 6.79394C10.6146 6.55934 10.9939 6.55875 11.2285 6.79275C11.4637 7.02675 11.4636 7.40654 11.2296 7.64114L8.21337 10.6664C7.36737 11.5142 6.19198 12.0001 4.98778 12.0001Z'
              fill='#7B7A79'
            />
          </svg>
        </>
      );
    case 'send-icon':
      return (
        <>
          <path
            fill={fill}
            d='M2.707 5.707 5 3.414V11a1 1 0 1 0 2 0V3.414l2.293 2.293a1 1 0 0 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 1.414 1.414Z'
          />
        </>
      );
    case 'dot-icon':
      return (
        <>
          <path
            d='M0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2Z'
            fill='#7B7A79'
          />
        </>
      );
    case 'priority-urgent-icon':
      return (
        <>
          <path
            fill='#313130'
            d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm-.45 3.3a.45.45 0 0 1 .9 0v2.743a.45.45 0 0 1-.9 0V3.3Zm.462 5.4a.603.603 0 0 1-.603-.6c0-.331.266-.6.597-.6h.006a.6.6 0 1 1 0 1.2Z'
          />
        </>
      );
    case 'priority-high-icon':
      return (
        <>
          <path
            fill='#313130'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1ZM6.462 3h-.923c-.51 0-.924.448-.924 1v7c0 .552.414 1 .924 1h.923c.51 0 .923-.448.923-1V4c0-.552-.414-1-.923-1ZM11.077 0h-.923c-.51 0-.923.448-.923 1v10c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V1c0-.552-.413-1-.923-1Z'
          />
        </>
      );
    case 'priority-Medium-icon':
      return (
        <>
          <path
            fill='#313130'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1ZM6.461 3h-.923c-.51 0-.923.448-.923 1v7c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V4c0-.552-.413-1-.923-1Z'
          />
          <path
            fill='#C4C3C1'
            d='M11.077 0h-.923c-.51 0-.923.448-.923 1v10c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V1c0-.552-.413-1-.923-1Z'
          />
        </>
      );
    case 'priority-low-icon':
      return (
        <>
          <path
            fill='#313130'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.414 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1Z'
          />
          <path
            fill='#C4C3C1'
            d='M6.461 3h-.923c-.51 0-.923.448-.923 1v7c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V4c0-.552-.413-1-.923-1ZM11.077 0h-.923c-.51 0-.923.448-.923 1v10c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V1c0-.552-.413-1-.923-1Z'
          />
        </>
      );
    case 'priority-no-icon':
      return (
        <>
          <path
            fill='#C4C3C1'
            d='M1.846 6H.923C.413 6 0 6.448 0 7v4c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V7c0-.552-.413-1-.923-1ZM6.462 3h-.923c-.51 0-.923.448-.923 1v7c0 .552.413 1 .923 1h.923c.51 0 .923-.448.923-1V4c0-.552-.413-1-.923-1ZM11.077 0h-.924c-.51 0-.923.448-.923 1v10c0 .552.414 1 .923 1h.924c.51 0 .923-.448.923-1V1c0-.552-.414-1-.923-1Z'
          />
        </>
      );
    case 'error-icon':
      return (
        <>
          <path
            fill='#BC5749'
            d='M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Zm-.525 3.85a.525.525 0 0 1 1.05 0v3.2a.525.525 0 0 1-1.05 0v-3.2Zm.539 6.3a.703.703 0 0 1-.704-.7c0-.386.31-.7.697-.7h.007a.7.7 0 1 1 0 1.4Z'
          />
        </>
      );
    case 'google-icon':
      return (
        <>
          <path
            fill='#4280EF'
            d='M15.1 8.086c0-.49-.048-.996-.127-1.47H8.13v2.798h3.92a3.298 3.298 0 0 1-1.454 2.197l2.34 1.817c1.374-1.28 2.165-3.145 2.165-5.342Z'
          />
          <path
            fill='#34A353'
            d='M8.13 15.167c1.96 0 3.603-.648 4.804-1.754l-2.339-1.802c-.648.442-1.486.695-2.466.695-1.897 0-3.493-1.28-4.078-2.987l-2.403 1.85c1.233 2.45 3.73 3.998 6.481 3.998Z'
          />
          <path
            fill='#F6B704'
            d='M4.051 9.303c-.3-.901-.3-1.881 0-2.782L1.65 4.656a7.265 7.265 0 0 0 0 6.512L4.05 9.303Z'
          />
          <path
            fill='#E54335'
            d='M8.13 3.533a3.959 3.959 0 0 1 2.781 1.091l2.071-2.086A6.983 6.983 0 0 0 8.129.657a7.248 7.248 0 0 0-6.48 3.999L4.05 6.52c.585-1.723 2.181-2.988 4.078-2.988Z'
          />
        </>
      );
    case 'cross-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <mask
              id='b'
              width={16}
              height={16}
              x={0}
              y={0}
              maskUnits='userSpaceOnUse'
              style={{
                maskType: 'luminance',
              }}
            >
              <path fill='#fff' d='M16 0H0v16h16V0Z' />
            </mask>
            <g mask='url(#b)'>
              <path
                fill='#7B7A79'
                d='m9.617 8 6.049-6.049A1.141 1.141 0 1 0 14.05.335L8 6.386 1.952.335A1.142 1.142 0 1 0 .336 1.952l6.049 6.05-6.049 6.048a1.141 1.141 0 1 0 1.616 1.616l6.049-6.049 6.049 6.05a1.14 1.14 0 0 0 1.616 0 1.141 1.141 0 0 0 0-1.617L9.616 8Z'
              />
            </g>
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'plus-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill='#282828'
              d='M11 5H7V1a1 1 0 0 0-2 0v4H1a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0V7h4a1 1 0 1 0 0-2Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 0h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'dropdown-unassign-icon':
      return (
        <>
          <path
            fill='#fff'
            d='M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Z'
          />
          <path
            fill='#C4C3C1'
            d='M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm.008 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM10 18.5c-2.21 0-4.23-.85-5.74-2.24.44-1.38 1.58-2.69 4.03-2.69h3.42c2.44 0 3.58 1.32 4.03 2.69A8.456 8.456 0 0 1 10 18.5Z'
          />
        </>
      );
    case 'search-icon':
      return (
        <>
          <path
            fill='#7B7A79'
            d='M11.718 11.152 9.413 8.848A5.223 5.223 0 0 0 10.65 5.47 5.256 5.256 0 0 0 5.4.22 5.256 5.256 0 0 0 .15 5.47a5.256 5.256 0 0 0 5.25 5.25 5.223 5.223 0 0 0 3.377-1.236l2.305 2.304a.449.449 0 1 0 .636-.636ZM1.05 5.47A4.355 4.355 0 0 1 5.4 1.12a4.355 4.355 0 0 1 4.35 4.35A4.355 4.355 0 0 1 5.4 9.82a4.355 4.355 0 0 1-4.35-4.35Z'
          />
        </>
      );
    case 'context-arrow-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill='#C4C3C1'
              d='m2.804 8.192 2.946-3.13L2.804 1.93a.754.754 0 0 1-.193-.513.753.753 0 0 1 .2-.51.667.667 0 0 1 .48-.213.665.665 0 0 1 .483.205l3.431 3.646c.129.136.201.322.201.515a.753.753 0 0 1-.2.516L3.773 9.223a.687.687 0 0 1-.223.163.652.652 0 0 1-.756-.154.77.77 0 0 1 .009-1.04Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 .07h10v10H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'context-assign-icon':
      return (
        <>
          <g clipPath='url(#a)'>
            <path
              fill={fill}
              d='M6 .07a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm.005 3a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM6 11.17a5.074 5.074 0 0 1-3.444-1.344c.264-.828.948-1.614 2.418-1.614h2.052c1.464 0 2.148.792 2.418 1.614A5.074 5.074 0 0 1 6 11.17Z'
            />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 .07h12v12H0z' />
            </clipPath>
          </defs>
        </>
      );
    case 'context-snooze-icon':
      return (
        <>
          <path
            fill={fill}
            fillRule='evenodd'
            d='M6 .07a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm2.118 8.118a.449.449 0 0 1-.636 0l-1.8-1.8a.45.45 0 0 1-.132-.318v-3a.45.45 0 0 1 .9 0v2.814l1.668 1.668a.45.45 0 0 1 0 .636Z'
            clipRule='evenodd'
          />
        </>
      );
    case 'context-label-icon':
      return (
        <>
          <path
            fill={fill}
            d='m11.307 8.21-3.174 3.18c-.913.907-1.853.907-2.76 0l-.536-.542a.2.2 0 0 1 0-.283l5.651-5.65a.2.2 0 0 1 .283 0l.535.535c.94.94.907 1.847 0 2.76ZM9.799 4.225l-5.651 5.65a.2.2 0 0 1-.283 0L.573 6.585A1.956 1.956 0 0 1 0 5.199V1.37A1.3 1.3 0 0 1 1.3.07h3.825a1.95 1.95 0 0 1 1.382.574l3.292 3.298a.2.2 0 0 1 0 .283ZM3.333 2.737a.666.666 0 0 0-.665-.667h-.007A.664.664 0 0 0 2 2.737a.666.666 0 1 0 1.334 0Z'
          />
        </>
      );
    case 'setting-icon':
      return (
        <>
          <path
            fill={fill}
            d='M11.887 7.733a2.004 2.004 0 0 1 0-3.466c.106-.067.146-.2.08-.307l-1.114-1.92a.213.213 0 0 0-.186-.113c-.04 0-.08.013-.114.033a2.041 2.041 0 0 1-1 .267c-.353 0-.7-.094-1.013-.274-.62-.36-1-1.013-1-1.726C7.54.1 7.44 0 7.32 0H4.68c-.12 0-.22.1-.22.227 0 .713-.38 1.366-1 1.726-.313.18-.66.274-1.013.274-.347 0-.694-.094-1-.267a.213.213 0 0 0-.3.08L.027 3.96A.211.211 0 0 0 0 4.067c0 .08.04.153.113.2.62.36 1 1.013 1 1.726 0 .72-.38 1.38-.993 1.74H.113c-.106.067-.146.2-.08.307l1.114 1.92c.04.073.113.113.186.113.04 0 .08-.013.114-.033a2.028 2.028 0 0 1 2.013.007c.613.36.993 1.013.993 1.726 0 .127.1.227.227.227h2.64c.12 0 .22-.1.22-.227 0-.713.38-1.366 1-1.726.313-.18.66-.274 1.013-.274.347 0 .694.094 1 .267.107.067.24.027.3-.08l1.12-1.92A.211.211 0 0 0 12 7.933c0-.08-.04-.153-.113-.2ZM6 8c-1.107 0-2-.893-2-2s.893-2 2-2 2 .893 2 2-.893 2-2 2Z'
          />
        </>
      );
    case 'logout-icon':
      return (
        <>
          <path
            fill={fill}
            d='M3.158 6.474h4.42V9.789c0 1.264-.63 1.895-1.894 1.895h-3.79C.633 11.684 0 11.053 0 9.79V2.21C0 .947.632.316 1.895.316h3.79c1.262 0 1.894.631 1.894 1.894V5.526H3.158a.474.474 0 0 0 0 .948Zm8.648-.655a.473.473 0 0 0-.103-.154L9.808 3.77a.474.474 0 1 0-.67.67l1.087 1.086H7.579v.948h2.646L9.138 7.56a.474.474 0 0 0 .67.67l1.895-1.895a.473.473 0 0 0 .103-.516Z'
          />
        </>
      );
  }
};

const SVGIcon = ({
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

export default SVGIcon;

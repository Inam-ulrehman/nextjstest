import { createTheme } from '@nextui-org/react'

export const Theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  },
})

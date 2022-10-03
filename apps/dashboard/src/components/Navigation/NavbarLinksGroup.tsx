import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles } from '@mantine/core'
import { TablerIcon, IconChevronLeft, IconChevronRight } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}))

interface LinksGroupProps {
  icon: TablerIcon
  label: string
  link?: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
}

export const LinksGroup: React.FC<LinksGroupProps> = ({ icon: Icon, label, link, initiallyOpened, links }) => {
  const { classes, theme } = useStyles()
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
  const items = (hasLinks ? links : []).map((link) => (
    <Text key={link.label} component={Link} className={classes.link} to={link.link}>
      {link.label}
    </Text>
  ))

  return (
    <>
      {/* @ts-ignore */}
      <UnstyledButton component={!link?.length ? undefined : Link} to={link} onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

// const mockdata = {
//   label: 'Releases',
//   icon: IconCalendarStats,
//   links: [
//     { label: 'Upcoming releases', link: '/' },
//     { label: 'Previous releases', link: '/' },
//     { label: 'Releases schedule', link: '/' },
//   ],
// }

// export const NavbarLinksGroup: React.FC = () => {
//   return (
//     <Box
//       sx={(theme) => ({
//         minHeight: 220,
//         padding: theme.spacing.md,
//         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
//       })}
//     >
//       <LinksGroup {...mockdata} />
//     </Box>
//   )
// }

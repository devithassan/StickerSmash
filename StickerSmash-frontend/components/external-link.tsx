import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {

  const handlePress = async (event: any) => {
    // ✅ Prevent default router navigation on native
    if (Platform.OS !== 'web') {
      event.preventDefault();

      try {
        await openBrowserAsync(href, {
          presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
        });
      } catch (error) {
        console.warn('Failed to open browser:', error);
      }
    }
  };
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}

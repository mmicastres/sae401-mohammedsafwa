# UX 

## Group members:
- Alshanqiti Mohammed
- Djelabi Safwa

## General description of the application:

Web and mobile application allowing to explore the biodiversity of insects and to learn more about their crucial role in the ecosystem.
The goal is to photograph and collect insects found in the user's environment, and gradually complete the catalog and categories of insects offered on the application. A user with a complete catalog of insects referenced on our application as well as his profile with all collected insects and his personal information. He will also be able to use a "photo" button in the menu to continue his collection.


## Design system retained:


Our choices were focused on the following design systems: Base and Fluent 2.
The activity sector of Uber being directly linked to customer services, their design system transmits a more familiar atmosphere than our second choice “Fluent 2” from Microsoft. The latter being much more rigid especially in the absence of roundness.
Thus, we have chosen the design system “Base” from Uber which we consider more corresponding to the theme of our application.

## Features / Screens:

1. **Home screen:**
   - Minimalist page highlighting the title of the application and decorative elements illustrating the theme.
   - Activation button to start using or view the collection once connected.
   - Simple screen, highlighting the application's theme with insect vectors on the page and a minimalist button. We seek to highlight the graphic style and the application itself.
No animations in desktop version as this page is the entry point of the application. However, we will integrate an animation on the mobile version to dynamize the user's first impression when opening the application.

2. **Catalog screen:**
   - Uses cards to display insects with sorting options by type and size.
   - Search bar to facilitate searching among insects.
   - Airy design integrating an insect logo and containing icons on each insect. The design is based on components taking a significant place on the page to reinforce the idea and strengths of the base design and its familiar aspect. It is also important to remember that the primary purpose of the application is educational, so it is important that the information on the insect is at the heart of the design.
In terms of animations, there won't be any on PC but on mobile there will be a loading on 'tap' on searches.

3. **Insect detail screen:**
   - Displays detailed information of the insect in a dropdown.
   - Integrates a section with the photo of the insect in question.
   - Again a simple and airy design with a minimum of information given to the user in order not to overload him. This screen follows the same codes as the previous screens, the same goes for the question of animations.

4. **User collection screen:**
   - Presents the insect collection in gallery form with a progress bar (except on mobile).
   - Allows the user to follow their progress in the collection and also know when they made the acquisition.
   - Very similar to the previous screen in its layout, this screen integrates the minimum information in a simple and clear way respecting the design system and the “simple” and “friendly” image of base.

5. **User space screen:**
   - Allows changing the nickname, email, password, application language and offers the possibility to delete his account.
   - No significant change on mobile, except for navigation.
   - The screen integrates text and inputs in order to modify the mentioned information. The only animations will be those of the modals in overlay with a pop to confirm each user action.

6. **Photo taking screen:**
   - Exclusively on mobile to exploit the phone's camera functionality.
   - This screen will be that of the phone's native camera, it will therefore inherit the animations specific to the system of the device and will send the photos taken to the API.

7. **Photo loading screen:**
   - Only on mobile, reassures the user waiting for the photo taking results.
  - The “post-capture” screen containing only text and an icon reassuring and indicating to the user that we have recognized the capture of an insect.
There will be a loading animation plus the phone vibration as feedback.

## Navigation:

The menu is visible, offering an intuitive experience with few elements to display. On mobile, an icon to take photos is added, emphasizing the importance of this functionality.

### Other means of navigation:
- An arrow at the top right on the mobile version allows to go back easily, avoiding to go through the main menu again.

## Final mockups:

The final mockups were elaborated using the design systems of Base and Fluent 2. Finally, the choice was made for the Base design system. The mockups can be consulted below:

- base (chosen) (safwa) : [InsectiDex_base](https://www.figma.com/file/NfudSTFo1nVCHj6POoCjZA/InsectiDex_base?type=design&node-id=81%3A95774&mode=design&t=eVJ8XIbOk5PQHMzj-1)
- fluent (mohammed)  : [InsectiDex_fluent](https://www.figma.com/file/KxrfHTcQ61DZqhiUxeWRxP/InsectiDex_fluent?type=design&node-id=0%3A1&mode=design&t=iQWoLjAVvLuuLdBN-1)


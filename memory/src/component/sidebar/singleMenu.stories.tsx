import { Meta, Story } from "@storybook/react/types-6-0";
import { SingleMenu, SingleMenuProps } from "./singleMenu";

export default {
  title: "Sidebar/singelMenu",
  component: SingleMenu,
} as Meta;

const Template: Story<SingleMenuProps> = (args) => {
  return (
    <section className={"bg-black-primary inline-block"}>
      <SingleMenu {...args} />
    </section>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: "I am primary",
  onMenuClick : (e) => {
    e.preventDefault();
    console.log(e)
  }
};

export const Turncate = Template.bind({});
Turncate.args = { ...Primary.args,
  label:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corporis tempora sapiente commodi reprehenderit pariatur enim dolore! Officiis deserunt esse magnam commodi voluptates non nesciunt debitis assumenda excepturi mollitia sint, porro laboriosam et vel neque beatae fugiat reiciendis quod aspernatur quam distinctio magni est. Deleniti, odio at delectus possimus et hic eos magnam quia excepturi omnis ipsa voluptatum dolores iusto temporibus unde exercitationem autem ea modi ducimus, quas maxime aliquam veritatis. Neque magni commodi odit nihil optio eligendi, eveniet, officia quisquam alias, ipsa esse repellat excepturi soluta ea. Perspiciatis nobis rerum delectus architecto non quas, vero, sit sunt quae porro nemo doloribus modi dolore fuga libero quam reiciendis beatae accusantium debitis quia adipisci unde natus illum! Officiis, rem quod. Molestiae voluptate suscipit doloribus iure vitae molestias soluta! Dolore nobis assumenda dolorum, explicabo illo nisi consequuntur doloremque similique quis quia aspernatur vitae, iste aut autem commodi vero id eaque, quod aliquid non natus error incidunt? Vel iure quisquam deserunt libero laborum velit quaerat eos aspernatur, veniam vitae fugit, nihil aliquid eligendi voluptas earum eveniet dolorum nemo omnis? Omnis odio nihil at suscipit maxime mollitia consequuntur nisi corrupti molestiae necessitatibus nemo, minus quas voluptates neque ab aperiam vel eaque iste ex dolorum perspiciatis minima cumque. Mollitia, incidunt. Magni iste, est itaque culpa reiciendis illo quo, quidem minus modi perferendis doloremque tempore, corporis consequuntur quaerat doloribus? Accusamus rem, nihil necessitatibus vero hic explicabo repudiandae autem quaerat ea esse harum. Repudiandae praesentium, ipsum exercitationem, excepturi perferendis consequuntur illo magnam nihil voluptatem quia quibusdam consequatur esse molestiae, ratione nobis laudantium blanditiis inventore ipsam sapiente a qui optio. Obcaecati placeat sint vitae modi harum aut ipsam ea, architecto quasi? A quidem eius sit atque nesciunt. Veniam rerum voluptates natus illum dolor? Ipsa laudantium, doloremque sunt, atque aliquid perspiciatis voluptate iure nisi quibusdam doloribus velit. Corporis, in.",
};

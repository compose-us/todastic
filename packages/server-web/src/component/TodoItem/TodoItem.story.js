import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import TodoItem from "./TodoItem.vue";
Vue.component("TodoItem", TodoItem);

storiesOf("TodoItem", module)
  .add("open", () => ({
    components: { TodoItem },
    render() {
      const todo = { status: "open", text: "this is an open todo", labels: [] };
      return <todo-item todo={todo} />;
    }
  }))
  .add("done", () => ({
    components: { TodoItem },
    render() {
      const todo = { status: "done", text: "this is a done todo", labels: [] };
      return <todo-item todo={todo} toggleState={() => (todo.status = "open")} />;
    }
  }))
  .add("with labels", () => ({
    components: { TodoItem },
    render() {
      const todo = {
        status: "open",
        text: "this is a todo with labels",
        labels: [{ id: 1, text: "foo" }, { id: 2, text: "bar" }, { id: 3, text: "baz" }, { id: 4, text: "something" }]
      };
      return <todo-item todo={todo} />;
    }
  }))
  .add("example", () => ({
    components: { TodoItem },
    methods: {
      toggleExpand() {
        this.isExpanded = !this.isExpanded;
      },
      toggleState() {
        this.todo.status = this.todo.status === "done" ? "open" : "done";
      }
    },
    data() {
      return {
        isExpanded: false,
        todo: {
          status: "open",
          text:
            "some really nice todo\nBacon ipsum dolor amet chuck meatloaf tongue fatback capicola. Pork leberkas shank pork chop rump. Cow doner pork belly jerky. Pork chop alcatra drumstick spare ribs strip steak brisket burgdoggen turkey leberkas boudin prosciutto. Doner pig biltong alcatra hamburger tongue salami corned beef frankfurter leberkas picanha. Filet mignon hamburger rump short ribs.\n\nT-bone meatball venison beef ribs flank chuck ground round, swine leberkas short loin biltong ham hock landjaeger strip steak. Bacon short loin sirloin flank. Filet mignon kevin bresaola bacon. Drumstick pancetta cupim ground round rump, swine bacon venison shank t-bone leberkas pork kevin. Drumstick jowl fatback, shankle spare ribs alcatra swine prosciutto. Pork loin pork turducken venison, frankfurter ham hock turkey kielbasa alcatra tenderloin shoulder ham landjaeger salami sausage. Prosciutto pork chop biltong chuck salami flank jowl tail picanha jerky shankle.\n\nAlcatra ham shankle beef ribs shank ham hock pork chop burgdoggen short ribs sirloin kevin andouille pork bacon. Beef brisket prosciutto frankfurter andouille tenderloin alcatra ribeye venison short ribs. Hamburger landjaeger bacon, pork belly turducken andouille pancetta ham leberkas. Beef ribs fatback andouille tenderloin. Filet mignon flank pancetta swine alcatra pork loin porchetta doner kielbasa shank tongue fatback cow drumstick andouille. Boudin burgdoggen alcatra frankfurter. Meatloaf shank ham leberkas kevin ball tip.\n\nJerky prosciutto kielbasa rump pastrami burgdoggen spare ribs beef ribs pancetta. Filet mignon t-bone tongue, boudin turducken hamburger frankfurter jerky ham ham hock shankle cow kevin shoulder. Rump swine short loin ball tip, shank tri-tip filet mignon corned beef landjaeger hamburger beef ribs ham hock beef biltong. Shoulder pastrami turkey chicken andouille spare ribs. Ball tip cupim doner boudin chicken, sirloin meatball pork loin landjaeger filet mignon t-bone jowl hamburger pork chop andouille. Andouille tongue kielbasa shankle spare ribs, venison t-bone.\n\nJerky tail jowl flank kevin. Hamburger jowl biltong boudin pig alcatra jerky turkey bresaola spare ribs fatback porchetta. Meatball pork chop boudin, cupim brisket beef bacon flank pancetta beef ribs spare ribs drumstick strip steak picanha ball tip. Tongue picanha cupim short loin chuck ball tip shank. Pork jowl jerky doner swine. Shank boudin burgdoggen, short loin pork chop venison corned beef capicola.",
          labels: [{ id: 1, text: "foo" }, { id: 2, text: "bar" }, { id: 3, text: "baz" }, { id: 4, text: "something" }]
        }
      };
    },
    render() {
      return (
        <todo-item
          todo={this.todo}
          isExpanded={this.isExpanded}
          toggleExpand={this.toggleExpand}
          toggleState={this.toggleState}
        />
      );
    }
  }));

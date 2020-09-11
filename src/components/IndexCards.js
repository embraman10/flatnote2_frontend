import React from "react";
import { Button, Card} from "semantic-ui-react";

const IndexCards = (props) => {
  const { id, title, contents } = props.note;
  return (
    <Card>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{contents}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button  onClick={() => props.openNote(id)}>
              View
          </Button>

          <Button  onClick={() => props.deleteNote(id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default IndexCards;

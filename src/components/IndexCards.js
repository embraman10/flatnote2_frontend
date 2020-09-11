import React from "react";
import { Button, Card} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const IndexCards = (props) => {

  const { id, title, contents } = props.note;
  // const timeStamp = Date.now()


  return (
    <Card className="segment centered padded piled fluid">
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <div className="meta"> 
        </div>
        <Card.Description>{contents}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
        <Button as={Link} to={`/notes/edit/${id}`}>
                Edit
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

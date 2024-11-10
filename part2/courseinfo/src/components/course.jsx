const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.parts.name} {props.parts.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  const Parts = props.parts.map((element) => {
    return <Part key={element.id} parts={element} />;
  });

  return <div>{Parts}</div>;
};

const Total = (props) => {
  const sum = props.parts.reduce((acc, order) => acc + order.exercises, 0);
  return (
    <div>
      <p>Number of exercises: {sum}</p>
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;

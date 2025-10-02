type Props = {
  value: string;
  state: {
    num1: string;
    num2: string;
    op: string | null;
    result: number | null;
  };
  setState: {
    setNum1: (val: string | ((prev: string) => string)) => void;
    setNum2: (val: string | ((prev: string) => string)) => void;
    setOp: (op: string | null) => void;
    setResult: (res: number | null) => void;
  };
  handlers: any;
};

export default function Button({ value, state, setState, handlers }: Props) {
  const { num1, num2, op } = state;
  const { setNum1, setNum2, setOp, setResult } = setState;

  // Handles when certain buttons are clicked
  if (value === "=") {
    return (
      <button
        onClick={() => handlers.handleCalc(num1, num2, op, setResult)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }
  if (["+", "-", "x", "/"].includes(value)) {
    return (
      <button
        onClick={() => setOp(value)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }
  if (value === "AC") {
    return (
      <button
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
        onClick={() => handlers.handleAC(setNum1, setNum2, setOp, setResult)}
      >
        {value}
      </button>
    );
  }
  if (value === "⌫") {
    return (
      <button
        onClick={() =>
          handlers.handleBackspace(op, setNum1, setNum2, num1, num2)
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }
  if (value === "%") {
    return (
      <button
        onClick={() => handlers.handle100(op, num1, num2, setResult)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "+/-") {
    return (
      <button
        onClick={() =>
          handlers.handlePlusMinus(op, setNum1, setNum2, num1, num2)
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "log10") {
    return (
      <button
        onClick={() => handlers.handleLog10(op, setNum1, setNum2, num1, num2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "ln") {
    return (
      <button
        onClick={() => handlers.handleLn(op, setNum1, setNum2, num1, num2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "cos") {
    return (
      <button
        onClick={() => handlers.handleCos(op, setNum1, setNum2, num1, num2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "sin") {
    return (
      <button
        onClick={() => handlers.handleSin(op, setNum1, setNum2, num1, num2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "π") {
    return (
      <button
        onClick={() => handlers.handlePi(op, setNum1, setNum2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "⅟x") {
    return (
      <button
        onClick={() =>
          handlers.handleFraction(op, setNum1, setNum2, num1, num2)
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "x²") {
    return (
      <button
        onClick={() => handlers.handlePowers(op, setNum1, setNum2, num1, num2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "x!") {
    return (
      <button
        onClick={() =>
          handlers.handleFactorial(op, setNum1, setNum2, num1, num2)
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === "√") {
    return (
      <button
        onClick={() => handlers.handleSqrt(op, setNum1, setNum2, num1, num2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (value === ".") {
    return (
      <button
        onClick={() => handlers.handleDecimal(op, num1, num2, setNum1, setNum2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }

  if (/[0-9]/.test(value)) {
    // What is /[0-9]/.test(value) mean?
    return (
      <button
        onClick={() => handlers.handleNumClick(value, op, setNum1, setNum2)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "gold"; // 👈 reset color
        }}
      >
        {value}
      </button>
    );
  }
  // default
  return (
    <button
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.color = "blue"; // 👈 text turns blue on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.color = "gold"; // 👈 reset color
      }}
    >
      {value}
    </button>
  );
}

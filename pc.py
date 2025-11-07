import sys
import os

def createNewComponent(name):
    component_dir = os.path.join('.', 'components', name)
    os.makedirs(component_dir, exist_ok=True)
    index_file_path = os.path.join(component_dir, 'index.tsx')

    # Write the React component boilerplate
    with open(index_file_path, 'w') as f:
        f.write(f"export function {name}() {{\n")
        f.write("    return (\n")
        f.write(f"        <div>{name} component</div>\n")
        f.write("    );\n")
        f.write("}\n")

    print(f"Component '{name}' created successfully at {component_dir}")

if __name__ == '__main__':
    args = sys.argv

    print(args[2])


    if args[1] == 'create-component':
        if len(args) < 3:
            print('please provide a valid component name')
            exit()

        createNewComponent(args[2])
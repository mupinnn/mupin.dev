{
  description = "Development environment";
  inputs = { nixpkgs.url = "github:NixOs/nixpkgs/nixos-unstable"; };
  outputs = { nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
    in {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in {
          default = pkgs.mkShell {
            packages = [ pkgs.bun pkgs.pnpm_11 pkgs.nodejs_24 ];
          };
        });
    };
}
